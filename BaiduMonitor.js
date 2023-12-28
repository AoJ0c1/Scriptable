// Variables used by Scriptable.
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
Script.setWidget(widget);
Script.complete();

async function createWidget(res) {
  let widget = new ListWidget();
  widget.spacing = spacing;

  // 添加标题
  let titleText = widget.addText(title);
  titleText.font = Font.boldSystemFont(16);
  titleText.textColor = Color.white();
  widget.addSpacer(5);

  // 每分钟更新一次
  widget.refreshAfterDate = new Date(Date.now() + 1000 * 60);

  // 遍历并添加热搜项目
  if (res && res.items) {
    var items = res.items;

    items.forEach((item, index) => {
      if (index < 6) { // 只显示前6个热搜
        let hStack = widget.addStack();
        hStack.layoutHorizontally();
        hStack.centerAlignContent();

        let bulletText = hStack.addText("• ");
        bulletText.font = Font.regularSystemFont(14);
        bulletText.textColor = Color.gray();

        let itemText = hStack.addText(`${item.title}`);
        itemText.font = Font.regularSystemFont(14);
        itemText.textColor = Color.white();

        hStack.addSpacer();
      }
    });
  }

  return widget;
}

async function getinfo() {
  const url = "https://top.baidu.com/board?tab=realtime";
  const html = await $.getStr({ url });
  return parseBaiduHot(html);
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
    url: "https://github.com/AoJ0c1/Scriptable/blob/main/BaiduMonitor.js",
  },
];
if (goupdate == true) update();
