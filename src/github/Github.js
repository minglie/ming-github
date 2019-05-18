const Provider = require('./provider');
const axios = require('axios');
const querystring = require('querystring');


 class Github extends Provider {
    /**
     * 构造函数
     */
    constructor(opts) {
        super(opts);
        this.token=opts.token;
        this.fetch=axios;
    }

      fg(opts = {}) {
         return {
             method: opts.method ? opts.method.toLowerCase() : 'get',
             url: `${opts.url}?${querystring.stringify({
                 access_token:  this.token,
                 ...opts.query,
             })}`,
             headers: opts.headers || {},
             data: opts.data,
         };
     }



     /**
      * 个人主要信息
      */
    async getUser() {
        return this.fetch({
            url: `${this._apiHost}/users/${this.options.username}`
        });
    }

     /**
      * 个人所有仓库
      */
     async reposListAll() {
         return this.fetch({
             url: `${this._apiHost}/users/${this.options.username}/repos`
         });
     }


     /**
      * 仓库详情
      */
     async reposDetails(reposName) {
         return this.fetch({
             url: `${this._apiHost}/repos/${this.options.username}/${reposName}`
         });
     }

     /**
      * repo中所有的commits列表
      * sha="/c15c91a059f7ea83964fda621f8edf990727616e"
      */
     async commitList(reposName,sha="") {
         return this.fetch({
             url: `${this._apiHost}/repos/${this.options.username}/${reposName}/commits${sha}`
         });
     }


     /**
      * issues列表
      * issueNum="/1"
      */
     async issuesList(reposName,issueNum="") {
         return this.fetch({
             url: `${this._apiHost}/repos/${this.options.username}/${reposName}/issues${issueNum}`
         });
     }





     /**
      * 获取某个repo的内容列表,或文件信息
      */
     async reposContents(reposName,path="") {
         return this.fetch({
             url: `${this._apiHost}/repos/${this.options.username}/${reposName}/contents${path}`
         });
     }


     /**
      * 获取某文件的原始内容
      */
     async fileContents(reposName,path="") {
         return this.fetch({
             url: `https://raw.githubusercontent.com/${this.options.username}/${reposName}/${branch}${path}`
         });
     }




     /**
      */
     async test(reposName,path="",branch="master") {
         return this.fetch(this.fg({
             url: `https://api.github.com/`
         }));
     }


     /**
      * 创建新文件 Create content
      */
     async createContent(reposName,path="",content) {
         return this.fetch(this.fg({
             method:"put",
             url: `https://api.github.com/repos/${this.options.username}/${reposName}/contents${path}`,
             data: {
                 "message": "commit from INSOMNIA",
                 "content":  Buffer.from(content).toString('base64')
             }
         }));
     }


     /**
      * 更新文件 Update content
      */
     async updateContent(reposName,path="",content) {
         let r=await this.reposContents(reposName,path);
         let sha= r.data.sha;
         return this.fetch(this.fg({
             method:"put",
             url: `https://api.github.com/repos/${this.options.username}/${reposName}/contents${path}`,
             data: {
                 "message": "commit from INSOMNIA",
                 "content":  Buffer.from(content).toString('base64'),
                 "sha": sha
             }
         }));
     }


     /**
      * 删除文件 Delete content
      */
     async deleteContent(reposName,path="") {
         let r=await this.reposContents(reposName,path);
         let sha= r.data.sha;
         return this.fetch(this.fg({
             method:"delete",
             url: `https://api.github.com/repos/${this.options.username}/${reposName}/contents${path}`,
             data: {
                 "message": "delete a file",
                 "sha": sha
             }
         }));
     }


     /**
      * 增加一条issue
      */
     async createIssue(reposName,opts={title:"title01","body":"b"}) {
         return this.fetch(this.fg({
             method:"post",
             url: `https://api.github.com/repos/${this.options.username}/${reposName}/issues`,
             data:opts
         }));
     }

     /**
      * 更改某条issue
      */
     async updateIssue(reposName,issueNum,opts={title:"title01","body":"b","state": "open"}) {
         return this.fetch(this.fg({
             method:"patch",
             url: `https://api.github.com/repos/${this.options.username}/${reposName}/issues/${issueNum}`,
             data:opts
         }));
     }

     /**
      * 锁住某条issue
      */
     async lockIssue(reposName,issueNum,opts={ "locked": true, "active_lock_reason": "too heated"}) {
         return this.fetch(this.fg({
             method:"put",
             url: `https://api.github.com/repos/${this.options.username}/${reposName}/issues/${issueNum}/lock`,
             data:opts
         }));
     }
     /**
      * 解锁某条issue
      */
     async unlockIssue(reposName,issueNum) {
         return this.fetch(this.fg({
             method:"delete",
             url: `https://api.github.com/repos/${this.options.username}/${reposName}/issues/${issueNum}/lock`,
         }));
     }


     /**
      * 增加comment
      */

     async createComment(reposName,issueNum,body) {
         return this.fetch(this.fg({
             method:"post",
             url: `https://api.github.com/repos/${this.options.username}/${reposName}/issues/${issueNum}/comments`,
             data:{body}
         }));
     }



     /**
      * 更改comment
      */
     async updateComment(reposName,commentId,body) {
         return this.fetch(this.fg({
             method:"patch",
             url: `https://api.github.com/repos/${this.options.username}/${reposName}/issues/comments/${commentId}`,
             data:{body}
         }));
     }

     /**
      * 删除comment
      */
     async deleteComment(reposName,commentId) {
         return this.fetch(this.fg({
             method:"delete",
             url: `https://api.github.com/repos/${this.options.username}/${reposName}/issues/comments/${commentId}`
         }));
     }



 };


module.exports =Github;