using System;
using System.Drawing;
using Microsoft.AspNetCore.Mvc;
using WallpaperGenerator.Core.Interfaces;

namespace WallpaperGenerator.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly IImageGenerator _imageGenerator;

        public ImageController(IImageGenerator imageGenerator)
        {
            _imageGenerator = imageGenerator ?? throw new ArgumentNullException(nameof(imageGenerator));
        }

        [HttpGet("{iR}/{iG}/{iB}/{iWidth}/{iHeight}")]
        public IActionResult Get(int iR, int iG, int iB, int iWidth, int iHeight)
        {
            string sFileName;
            byte[] imageBytes;
            Color colourFromRgb;

            colourFromRgb = Color.FromArgb(iR, iG, iB);

            try
            {
                imageBytes = _imageGenerator.CreateImage(iWidth, iHeight, colourFromRgb);
            }
            catch
            {
                return null;
            }

            sFileName = Guid.NewGuid().ToString();
            sFileName = sFileName.Replace("-", "");

            return File(imageBytes, "application/octet-stream", sFileName + ".jpg");
        }
    }
}
