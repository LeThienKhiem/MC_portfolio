/**
 * Script to update news articles in Supabase
 * Run with: npx tsx scripts/update-news.ts
 * Or: ts-node scripts/update-news.ts
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Missing Supabase environment variables');
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY)');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const newNewsArticles = [
  {
    title: 'Cơn địa chấn tại Mỹ Đình: Concert 3 "Anh Trai Say Hi" cháy vé trong phút chốc',
    content: 'Sức nóng của 30 Anh Trai chưa bao giờ hạ nhiệt. Hàng chục ngàn khán giả đã lấp đầy Sân vận động Mỹ Đình, tạo nên biển lightstick rực rỡ. Đêm diễn ghi dấu ấn với những bản phối mới và màn trình diễn mãn nhãn, khẳng định vị thế show âm nhạc thực tế số 1 Việt Nam.',
    thumbnail_url: 'https://fkhlijhqhxsmwwoxobmp.supabase.co/storage/v1/object/public/Image/605165253_1462718982191223_4288953798552647328_n.jpg',
    created_at: new Date().toISOString(),
  },
  {
    title: 'Đêm diễn bùng nổ cảm xúc tại Vạn Phúc City: Khán giả đội mưa cổ vũ',
    content: 'Concert 2 tại TP.HCM đã để lại những khoảnh khắc không thể quên. Dù thời tiết không ủng hộ, nhưng sự nhiệt huyết của dàn line-up và khán giả đã biến Vạn Phúc City thành một "chảo lửa" thực sự. Các tiết mục như "Ngáo Ngơ", "Hào Quang" được remix cực cháy.',
    thumbnail_url: 'https://fkhlijhqhxsmwwoxobmp.supabase.co/storage/v1/object/public/Image/469176626_122124140288551154_3107982728511076430_n.jpg',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
  },
  {
    title: 'Hành trình 30 Anh Trai: Từ show truyền hình đến biểu tượng văn hóa Gen Z',
    content: 'Không chỉ là một chương trình giải trí, "Anh Trai Say Hi" đã tạo nên một làn sóng văn hóa mới. Sự kết hợp giữa âm nhạc hiện đại, thời trang và tư duy nghệ thuật của thế hệ mới đã chinh phục hoàn toàn khán giả trẻ, mở ra kỷ nguyên mới cho V-Pop.',
    thumbnail_url: 'https://fkhlijhqhxsmwwoxobmp.supabase.co/storage/v1/object/public/Image/1733815786-anh-trai-say-hi-1-min-watermark.png',
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
  },
];

async function updateNews() {
  try {
    console.log('🔄 Starting news update...');

    // Step 1: Delete all existing news
    console.log('🗑️  Deleting existing news...');
    const { error: deleteError } = await supabase
      .from('news')
      .delete()
      .neq('id', 0); // Delete all rows

    if (deleteError) {
      console.error('❌ Error deleting news:', deleteError);
      throw deleteError;
    }
    console.log('✅ All existing news deleted');

    // Step 2: Insert new news articles
    console.log('📝 Inserting new news articles...');
    const { data, error: insertError } = await supabase
      .from('news')
      .insert(newNewsArticles)
      .select();

    if (insertError) {
      console.error('❌ Error inserting news:', insertError);
      throw insertError;
    }

    console.log('✅ Successfully inserted', data?.length || 0, 'news articles');
    console.log('\n📰 New articles:');
    data?.forEach((article, index) => {
      console.log(`\n${index + 1}. ${article.title}`);
      console.log(`   Created: ${new Date(article.created_at).toLocaleString()}`);
    });

    console.log('\n✨ News update completed successfully!');
  } catch (error: any) {
    console.error('❌ Failed to update news:', error.message);
    process.exit(1);
  }
}

// Run the script
updateNews();


