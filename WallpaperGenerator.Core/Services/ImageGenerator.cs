using System.Drawing;
using System.IO;
using System.Drawing.Imaging;
using WallpaperGenerator.Core.Interfaces;

namespace WallpaperGenerator.Core.Services
{
    public class ImageGenerator : IImageGenerator
    {
        public byte[] CreateImage(int iWidth, int iHeight, Color colour)
        {
            Bitmap bitmapImage;
            MemoryStream bitmapStream;

            // create bitmap of size
            bitmapImage = new Bitmap(iWidth, iHeight);

            // set each pixed to passed colour
            for(int x = 0; x < bitmapImage.Width; x++)
            {
                for(int y = 0; y < bitmapImage.Height; y++)
                {
                    bitmapImage.SetPixel(x, y, colour);
                }
            }

            // open memory stream
            using (bitmapStream = new MemoryStream())
            {
                // save image to memory stream as jpg
                bitmapImage.Save(bitmapStream, ImageFormat.Jpeg);
            }

            // return the memory stream array as bytes
            return bitmapStream.ToArray();
        }
    }
}
