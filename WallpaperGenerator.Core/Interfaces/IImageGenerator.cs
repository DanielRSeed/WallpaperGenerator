using System.Drawing;

namespace WallpaperGenerator.Core.Interfaces
{
    public interface IImageGenerator
    {
        byte[] CreateImage(int iWidth, int iHeight, Color colour);
    }
}
