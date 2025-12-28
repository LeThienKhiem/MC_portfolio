-- Xóa tin tức cũ (nếu muốn làm sạch)
TRUNCATE TABLE news;

-- Thêm 3 tin tức mới về Anh Trai Say Hi
INSERT INTO news (title, content, thumbnail_url, created_at)
VALUES 
(
  'Cơn địa chấn tại Mỹ Đình: Concert 3 "Anh Trai Say Hi" cháy vé trong phút chốc',
  'Sức nóng của 30 Anh Trai chưa bao giờ hạ nhiệt. Hàng chục ngàn khán giả đã lấp đầy Sân vận động Mỹ Đình, tạo nên biển lightstick rực rỡ. Đêm diễn ghi dấu ấn với những bản phối mới và màn trình diễn mãn nhãn, khẳng định vị thế show âm nhạc thực tế số 1 Việt Nam.',
  'https://fkhlijhqhxsmwwoxobmp.supabase.co/storage/v1/object/public/Image/605165253_1462718982191223_4288953798552647328_n.jpg',
  NOW()
),
(
  'Đêm diễn bùng nổ cảm xúc tại Vạn Phúc City: Khán giả đội mưa cổ vũ',
  'Concert 2 tại TP.HCM đã để lại những khoảnh khắc không thể quên. Dù thời tiết không ủng hộ, nhưng sự nhiệt huyết của dàn line-up và khán giả đã biến Vạn Phúc City thành một "chảo lửa" thực sự. Các tiết mục như "Ngáo Ngơ", "Hào Quang" được remix cực cháy.',
  'https://fkhlijhqhxsmwwoxobmp.supabase.co/storage/v1/object/public/Image/469176626_122124140288551154_3107982728511076430_n.jpg',
  NOW() - INTERVAL '2 days'
),
(
  'Hành trình 30 Anh Trai: Từ show truyền hình đến biểu tượng văn hóa Gen Z',
  'Không chỉ là một chương trình giải trí, "Anh Trai Say Hi" đã tạo nên một làn sóng văn hóa mới. Sự kết hợp giữa âm nhạc hiện đại, thời trang và tư duy nghệ thuật của thế hệ mới đã chinh phục hoàn toàn khán giả trẻ, mở ra kỷ nguyên mới cho V-Pop.',
  'https://fkhlijhqhxsmwwoxobmp.supabase.co/storage/v1/object/public/Image/1733815786-anh-trai-say-hi-1-min-watermark.png',
  NOW() - INTERVAL '5 days'
);

