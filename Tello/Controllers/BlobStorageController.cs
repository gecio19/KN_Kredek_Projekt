using Microsoft.AspNetCore.Mvc;
using System.IO.Compression;
using Tello.Models;
using Tello.Services;

namespace Tello.Controllers
{
    [Route("api/BlobStoreg")]
    public class BlobStorageController : ControllerBase
    {
        private readonly IBlobRepository _blobRepository;

        public BlobStorageController(IBlobRepository blobRepository)
        {
            _blobRepository = blobRepository;
        }
        [HttpGet("GetBlobFile")]
        public async Task<IActionResult> GetBlobFile([FromHeader]string path)
        {
            BlobObject result = await _blobRepository.GetBlobFile(path);

            FileStreamResult tmep = File(result.Content, result.ContentType);

            return File(result.Content,result.ContentType);

        }




        [HttpPost("UploadBlobFile")]
        public async Task<IActionResult> UploadBlobFile([FromBody] BlobContentModel model)
        {

            var result = await _blobRepository.UploadBlobFile(model.FilePath, model.FileName);
            return Ok(result);
        }
        [HttpDelete("DeleteBlob")]
        public IActionResult DeleteBlob(string path)
        {
            _blobRepository.DeleteBlob(path);
            return Ok();
        }

        [HttpGet("ListBlobs")]
        public async Task<IActionResult> ListBlobs()
        {
            var result = await _blobRepository.ListBlobs();
           
            return Ok(result);
        }
    }
}
