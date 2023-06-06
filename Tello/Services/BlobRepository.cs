using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using System;
using Tello.Models;

namespace Tello.Services;

public class BlobRepository : IBlobRepository
{
    private readonly BlobServiceClient _blobServiceClient;
    private BlobContainerClient client;

    //Zabezpiecznie rozszerzenia
    public static readonly List<string> ImageExtensions = new List<string> { ".JPG", ".JPEG", ".PNG" };

    public BlobRepository(BlobServiceClient blobServiceClient)
    {
        _blobServiceClient = blobServiceClient;
        client = _blobServiceClient.GetBlobContainerClient("blobcontainertello");
    }


    public async void DeleteBlob(string path)
    {
        var fileName = new Uri(path).Segments.LastOrDefault();
        var blobclient = client.GetBlobClient(fileName);
        await blobclient.DeleteIfExistsAsync();
    }

    public async Task<BlobObject> GetBlobFile(string url)
    {
        var fileName = new Uri(url).Segments.LastOrDefault();
        try
        {
            var blobClient = client.GetBlobClient(fileName);
            //Sprawdzenie czy istnieje:
            if(await blobClient.ExistsAsync())
            {
                BlobDownloadResult content = await blobClient.DownloadContentAsync();
                var downloadedData = content.Content.ToStream(); // konwersja na bity

                if(ImageExtensions.Contains(Path.GetExtension(fileName.ToUpperInvariant()))) 
                {
                    var extension = Path.GetExtension(fileName);
                    return new BlobObject { Content = downloadedData, ContentType = "image/" + extension.Remove(0, 1)};
                }
                else
                {
                    return new BlobObject { Content = downloadedData, ContentType = content.Details.ContentType };
                }
            }
            else
            {
                return null;
            }
        }
        catch(Exception ex)
        {
            throw;
        }
        throw new NotImplementedException();
    }




    public async Task<List<BlobObject>> GetAllBlobFiles()
    {
        //var _BlobNamesList = ListBlobs();

        var _BlobNamesList = await ListBlobs();


        List<BlobObject> ResultList = new List<BlobObject>();

        for (int i = 0; i < _BlobNamesList.Count; i++)
        {
            var fileName = _BlobNamesList[i];
            try
            {
                var blobClient = client.GetBlobClient(fileName);
                //Sprawdzenie czy istnieje:
                if (await blobClient.ExistsAsync())
                {
                    BlobDownloadResult content = await blobClient.DownloadContentAsync();
                    var downloadedData = content.Content.ToStream(); // konwersja na bity

                    if (ImageExtensions.Contains(Path.GetExtension(fileName.ToUpperInvariant())))
                    {
                        var extension = Path.GetExtension(fileName);
                        ResultList.Add(new BlobObject { Content = downloadedData, ContentType = "image/" + extension.Remove(0, 1) });
                        //return new BlobObject { Content = downloadedData, ContentType = "image/" + extension.Remove(0, 1) };
                    }
                    else
                    {
                        //return new BlobObject { Content = downloadedData, ContentType = content.Details.ContentType };
                    }
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        throw new NotImplementedException();
    }

    public async Task<List<string>> ListBlobs()
    {
        List<string> list = new List<string>();

        await foreach(var blobItem in client.GetBlobsAsync())
        {
            list.Add(blobItem.Name);
        }
        return list;
    }

    public async Task<string> UploadBlobFile(string filePath, string fileName)
    {
        filePath = FindPath(fileName);

        var blobclient = client.GetBlobClient(fileName);
        var status = await blobclient.UploadAsync(filePath);

        return blobclient.Uri.AbsoluteUri;
    }



    private string FindPath(string _fileName)
    {
        string fileName = _fileName;
        string desktopPath = Environment.GetFolderPath(Environment.SpecialFolder.Desktop);
        string fullNamePath = System.IO.Path.Combine(desktopPath, fileName);

        return fullNamePath;
    }







   
}


public interface IBlobRepository
{
    Task<BlobObject> GetBlobFile(string name);

    Task<List<BlobObject>> GetAllBlobFiles();

    Task<string> UploadBlobFile(string filePath,string fileName);
    void DeleteBlob(string name);
    Task<List<string>> ListBlobs();



}