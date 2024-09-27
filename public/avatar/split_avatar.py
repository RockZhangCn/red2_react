from PIL import Image
import os

def cut_circle_icons(image_path, rows, cols, icon_size, output_dir):
    # 打开图片
    image = Image.open(image_path)
    width, height = image.size

    # 创建输出目录
    os.makedirs(output_dir, exist_ok=True)

    # 计算每个图标的起始位置
    for row in range(rows):
        for col in range(cols):
            # 计算每个图标的左上角坐标
            left = col * icon_size + int(col * 10.5)
            top = row * icon_size + int(row * 12.4)
            right = left + icon_size
            bottom = top + icon_size

            # 切割图像
            icon = image.crop((left, top, right, bottom))

            # 生成图标文件名
            icon_filename = f"icon_{row * cols + col + 1}.png"
            icon.save(os.path.join(output_dir, icon_filename))
            print(f"Saved {icon_filename}")


# 使用示例
image_path = "..... avatar_all.png"  # 你的图片路径
rows = 4  # 行数
cols = 6  # 列数
icon_size = 85  # 每个图标的大小（假设都是正方形）
output_dir = "output_icons"  # 输出目录

# 9px
cut_circle_icons(image_path, rows, cols, icon_size, output_dir)
