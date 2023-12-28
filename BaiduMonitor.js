// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: fire;
/*
 * Author: AoJ0c1
 * Github: https://github.com/AoJ0c1/
 * 本脚本使用了Env.scriptable，感谢！
 */
const goupdate = true;
const $ = importModule("Env");
const title = `🔥 百度热搜`;
const preview = "medium";
const spacing = 5;

const res = await getinfo();

let widget = await createWidget(res);
widget.refreshAfterDate = new Date(Date.now() + 60000); // 设置小组件每分钟更新一次
Script.setWidget(widget);
Script.complete();

async function createWidget(res) {
  if (res && res.items) {
    var items = res.items.slice(0, 6); // 只取前6个热搜
    const opts = {
      title,
      texts: {
        text1: { text: `📌 ${items[0].title}`, url: items[0].url },
        text2: { text: `• ${items[1].title}`, url: items[1].url },
        text3: { text: `• ${items[2].title}`, url: items[2].url },
        text4: { text: `• ${items[3].title}`, url: items[3].url },
        text5: { text: `• ${items[4].title}`, url: items[4].url },
        text6: { text: `• ${items[5].title}`, url: items[5].url },
        battery: "true",
      },
      preview,
      spacing,
    };

    let widget = await $.createWidget(opts);
    return widget;
  }
}

async function getinfo() {
  const url = "https://top.baidu.com/board?tab=realtime";
  const html = await $.getStr({ url });
  const items = parseBaiduHot(html);
  return { items };
}

function parseBaiduHot(html) {
  const regex = /<div class="content_1YWBm">.*?<a href="(https:\/\/www\.baidu\.com\/s\?wd=.*?)".*?>([\s\S]*?)<\/div>/g;
  let match;
  let items = [];

  while ((match = regex.exec(html)) !== null) {
    let url = match[1].trim();
    let title = match[2].trim().replace(/<[^>]+>/g, ''); // 移除HTML标签
    items.push({ title, url });
  }

  return items;
}

// 更新代码
function update() {
  console.log("🔔更新脚本开始!");
  scripts.forEach(async (script) => {
    await $.getFile(script);
  });
  console.log("🔔更新脚本结束!");
}

const scripts = [
  {
    moduleName: "BaiduMonitor",
    url: "https://github.com/AoJ0c1/Scriptable/blob/main/BaiduMonitor.js", // 需要替换为实际的脚本 URL
  },
];
if (goupdate == true) update();
