
const Github = require('../src/github/Github.js');



github=new Github({token:"xxx",username: 'minglie'});




/**
 * 个人主要信息
 */
if(0)
github.getUser().then(d=>console.log(d.data))


/**
 * 个人所有仓库
 */
if(0)
github.reposListAll().then(d=>console.log(d.data))


/**
 * 仓库详情
 */
if(0)
github.reposDetails("ming_node").then(d=>console.log(d.data))


/**
 * 获取某个repo的内容列表,或文件信息
 */
if(0)
github.reposContents("ming_node","/a3.js").then(d=>console.log(d.data))


/**
 * 获取某文件的原始内容
 */
if(1)
github.fileContents("ming_node","/index.js").then(d=>console.log(d.data))



/**
 * repo中所有的commits列表
 * sha="/c15c91a059f7ea83964fda621f8edf990727616e"
 */
if(0)
github.commitList("ming_node","/a527d9b8b9d7085dbf87b90f6f247c4fe54fe4fe").then(d=>console.log(d.data))



/**
 * issues列表
 * issueNum="/1"
 */
if(0)
github.issuesList("ming_node").then(d=>console.log(d.data))



if(0)
github.test("ming_node").then(d=>console.log(d.data),e=>console.log(e))


/**
 * 创建新文件 Create content
 */
if(0)
github.createContent("ming_node","/wang/a3.js","网朋sdfsdf飞").then(d=>console.log(d.data.commit.sha),e=>console.log(e))




/**
 * 更新文件 Update content
 */
if(0)
github.updateContent("ming_node","/wang/a3.js","段舍得坊").then(d=>console.log(d.data.commit.sha),e=>console.log(e))


/**
 * 删除文件 Delete content
 */
if(0)
github.deleteContent("ming_node","/wang").then(d=>console.log(d.data),e=>console.log(e))



/**
 * 增加一条issue
 */
if(0)
github.createIssue("ming_node",{
    "title": "Creating issue from API",
    "body": "Posting a issue from Insomnia"
}).then(d=>console.log(d.data),e=>console.log(e))


/**
 * 更改某条issue
 */
if(0)
github.updateIssue("ming_node",1,{
    "title": "AAAA",
    "body": "Addf a issue from Insomnia",
    "state": "open"
}).then(d=>console.log(d.data),e=>console.log(e))



/**
 * 锁住某条issue
 */
if(0)
github.lockIssue("ming_node",1).then(d=>console.log(d.data),e=>console.log(e))



/**
 * 解锁某条issue
 */
if(0)
github.unlockIssue("ming_node",1).then(d=>console.log(d.data),e=>console.log(e))


/**
 * 增加comment
 */
if(0)
github.createComment("ming_node",1, "BBB").then(d=>console.log(d.data),e=>console.log(e))

/**
 * 更改comment
 */
if(0)
github.updateComment("ming_node", "493643757","VWBBB").then(d=>console.log(d.data),e=>console.log(e))


/**
 * 删除comment
 */
if(0)
github.deleteComment("ming_node", "493643757").then(d=>console.log(d.data),e=>console.log(e))
