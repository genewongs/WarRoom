const axios = require('axios');
const cheerio = require('cheerio');

const monster = {
  name: '',
  level: '',
  armor: '',
  health: '',
  movement: '',
  actions: [],
};

const initMonster = () => {
  monster.name = '';
  monster.level = '';
  monster.armor = '';
  monster.health = '';
  monster.movement = '';
  monster.actions = [];
};

module.exports.getMonsterInfo = async (url) => {
  try {
    const html = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36',
      },
    });
    const $ = await cheerio.load(html.data);

    initMonster();

    const monsterInfo = $('.mon-stat-block');
    monster.name = monsterInfo.find('.mon-stat-block__name > a').text().trim();

    const title = monsterInfo.find('.mon-stat-block__header .mon-stat-block__meta').text().replace(/[,]+/, '').split(' ')[1];
    const level = monsterInfo.find('.mon-stat-block__tidbits .mon-stat-block__tidbit-container div:nth-child(1) .mon-stat-block__tidbit-data').text().trim().replace(/ \(.*?\)/, '');

    monster.level = `Level ${level} ${title}`;

    monster.armor = monsterInfo.find('.mon-stat-block__attributes div:nth-child(1) .mon-stat-block__attribute-value span:nth-child(1)').text().trim();
    monster.health = monsterInfo.find('.mon-stat-block__attributes div:nth-child(2) .mon-stat-block__attribute-data .mon-stat-block__attribute-data-value').text().trim();

    $('.mon-stat-block .mon-stat-block__description-blocks div:nth-child(2) .mon-stat-block__description-block-content p').each((i, el) => {
      const item = $(el);
      const attackName = item.find('em > strong').text().replace(/[.]*$/, '');
      const attackDamage = item.find('span').text().replace(/\+\d{1,2}/, '');
      const action = {
        name: attackName,
        damage: attackDamage,
      };
      const attackStrikes = item.contents().each((i, element) => {
        if (element.type === 'text') {
          if (!isNaN(parseInt(element.data))) {
            element.data = element.data.replace(/^\s+|\s+$|\s+(?=\s)/g, '');
            action.strike = element.data;
          }
        }
      }).text();

      monster.actions.push(action);
    });

    monster.movement = monsterInfo.find('.mon-stat-block__attributes div:nth-child(3) .mon-stat-block__attribute-data .mon-stat-block__attribute-data-value').text().split(/[^0-9]+/);
    monster.movement = monster.movement.filter((str) => /\S/.test(str));
    let total = 0;
    for (let i = 0; i < monster.movement.length; i += 1) {
      total += parseInt(monster.movement[i]);
    }
    monster.movement = total.toString();
    return monster;
  } catch (err) {
    return err;
  }
};
