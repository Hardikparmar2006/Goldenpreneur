import axios from 'axios';
import * as cheerio from 'cheerio';

const urls = [
  'https://goldenpreneur.in/coffee-table-book-inquiries/',
  'https://goldenpreneur.in/apply-as-sponsor/',
  'https://goldenpreneur.in/apply-as-partner/',
  'https://goldenpreneur.in/advertis-with-us/',
  'https://goldenpreneur.in/collaboration-partnershipjoin-vyapaarjagat-partner-program/',
  'https://goldenpreneur.in/join-to-fund-rais/',
  'https://goldenpreneur.in/join-to-invest/',
  'https://goldenpreneur.in/membership-inquiry/',
  'https://goldenpreneur.in/publish-my-story/',
  'https://goldenpreneur.in/speaker-applications/',
  'https://goldenpreneur.in/start-a-chapter/',
  'https://goldenpreneur.in/talk-show-speakers/'
];

async function scrapeForms() {
  const results = {};
  for (const url of urls) {
    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      const fields = [];
      
      $('form input, form select, form textarea').each((i, el) => {
        const type = $(el).attr('type') || el.tagName.toLowerCase();
        if (type === 'hidden' || type === 'submit' || type === 'button') return;
        
        const name = $(el).attr('name') || '';
        const placeholder = $(el).attr('placeholder') || '';
        
        let label = '';
        const id = $(el).attr('id');
        if (id) {
            label = $(`label[for="${id}"]`).text().trim();
        }
        if (!label) {
            label = $(el).closest('label').text().trim();
        }
        if (!label) {
            label = $(el).parent().text().trim();
        }
        if (!label && placeholder) {
            label = placeholder;
        }

        fields.push({
            name,
            type,
            label: label.replace(/\s+/g, ' ').trim()
        });
      });
      
      results[url] = fields;
    } catch (e) {
      console.error(`Error fetching ${url}: ${e.message}`);
    }
  }
  console.log(JSON.stringify(results, null, 2));
}

scrapeForms();
