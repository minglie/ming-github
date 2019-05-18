

M=require('ming_node');


const config = {
    baseUrl: 'https://api.github.com'
};


class Provider {
  constructor(opts) {
      this._apiHost = config.baseUrl;
      this.options = opts;
  }


  get fetch() {
    return this._fetch;
  }
  set fetch(axios) {
    let agent = axios.create( {timeout:10000});

      if(0)
      agent.interceptors.request.use(config => {
          M.log(config.method,config.url,JSON.stringify(config.data))
          return config;
      },error=>{
           Promise.reject(error)
         }
      );


      if(0)
      agent.interceptors.response.use(
          response=>{
              return response;
          },
          error => {
              return Promise.reject(error)
          }
        )

       this._fetch = agent.request;
  }


}

module.exports = Provider;
