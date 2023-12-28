// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: fire;
/*
 * Author: AoJ0c1
 * Github: https://github.com/AoJ0c1/
 * 本脚本使用了Env.scriptable，感谢！
 */
const goupdate = false;
const $ = importModule("Env");
const title = `🔥 百度热搜`;
const preview = "medium";
const spacing = 5;

const res = await getinfo();

let widget = await createWidget(res);
Script.setWidget(widget);
Script.complete();

async function createWidget(res) {
  if (res && res.items) {
    var items = res.items;
    const opts = {
      title,
      texts: {},
      preview,
      spacing,
    };

    items.slice(0, 6).forEach((item, index) => {
      opts.texts[`text${index + 1}`] = { text: `• ${item.title}`, url: item.url };
    });

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
