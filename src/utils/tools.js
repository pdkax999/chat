export const loadLocalImg  = (src)=>{
    // 解析相对当前文件解析文件路径, 始终相对文件进行解析路径所以。拆分成函数反而会降低其灵活性
    return new URL(`../assets/${src}`, import.meta.url).href;
}