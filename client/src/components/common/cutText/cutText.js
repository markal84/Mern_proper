export default (content, maxLength) => {
    if(content.length < 1) return 'Post is too short';
    if(content.length <= maxLength) return content;
    return content.substr(0, content.lastIndexOf(' ', maxLength)) + '...';
};