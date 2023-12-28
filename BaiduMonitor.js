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

    items.forEach((item, index) => {
      if (index < 6) { // 只显示前6个热搜
        opts.texts[`text${index + 1}`] = { text: `• ${item.title}` };
      }
      battery: "true", // 添加电池显示
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
  const regex = /<div class="content_1YWBm">.*?<div class="c-single-text-ellipsis">([\s\S]*?)<\/div>/g;
  let match;
  let items = [];

  while ((match = regex.exec(html)) !== null) {
    let title = match[1].trim().replace(/<!--[\s\S]*?-->/g, ''); // 移除注释
    items.push({ title });
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
