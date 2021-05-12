module.exports = (app) =>{

    const musicname ={
        name:''
    }
    const musicLists =[]
    const express = require('express')
    const puppeteer = require('puppeteer');

    const router = express.Router()

    const music = require('../model/music')
    //创建一个工厂模式函数
    function creatmusic(name,author,url,img){
        let o = new Object();
        o.name=name;
        o.author=author;
        o.url=url;
        o.img=img;
        return o;
    }

    //获取音乐列表的函数
    async function fetchmusic(musicname){
    
        const browser = await puppeteer.launch({headless:true})
        const page = await browser.newPage()
        await page.goto(`https://m.music.migu.cn/v3/search?keyword=${musicname}`)

        // await page.waitForSelector('#search-input')

        // await (await page.$('#search-input')).click()

        // await page.waitForSelector('#researchBox')
        // const searchinput = await page.$('#researchBox')
        // await searchinput.type(musicname,{delay:100})

        // await (await page.$('#researchBtn')).click()

        await page.waitForSelector('#index_section')

        
        //获得前6条
        // const alllength1 = await page.$$eval('#index_section > div.song.nav_list.song_list > div',item=>item.length)
        // var count = 7;
        // if(alllength1<7){
        //     count = alllength1
        // }
        
        for(let i = 0;i<7;i++){
            await page.waitForSelector(`#index_section > div.song.nav_list.song_list > div:nth-child(${i+1}) > div.music_name.clearfix > div.audio_div > span`)
            const url = await page.$eval(`#index_section > div.song.nav_list.song_list > div:nth-child(${i+1}) > div.music_name.clearfix > div.audio_div > span`,item=>item.getAttribute('src'))
            
            const img = await page.$eval(`#index_section > div.song.nav_list.song_list > div:nth-child(${i+1}) > img`,item=>item.getAttribute('src'))
            const name = await page.$eval(`#index_section > div.song.nav_list.song_list > div:nth-child(${i+1}) > div.music_name.clearfix > div.left > h4`,item=>item.textContent)
            const author = await page.$eval(`#index_section > div.song.nav_list.song_list > div:nth-child(${i+1}) > div.music_name.clearfix > div.left > p`,item=>item.textContent)
            
            musicLists[i]= creatmusic(name,author,url,img)
        }
        // const musicSec = await page.$('body > div.seainput_div > div > input')
        // console.log(musicLists)
        // await  musicSec.type(musicname,{delay:100})


    

        await browser.close();
    }
    
    router.post('/musicname',async(req,res)=>{
        const data =  req.body
        musicname.name = data.name
        console.log(musicname)
        res.send('接收成功')
       
    
    })
    router.get('/musiclist',async(req,res)=>{
        await fetchmusic(musicname.name)

        res.send(musicLists)

    })
    router.get('/musicrec',async(req,res)=>{
        const music = [{
            name: '一路向北 (电影《头文字Ｄ》插曲)',
            author: '周杰伦',
            url: 'https://freetyst.nf.migu.cn/public%2Fproduct8th%2Fproduct39%2F2020%2F04%2F2415%2F2009%E5%B9%B406%E6%9C%8826%E6%97%A5%E5%8D%9A%E5%B0%94%E6%99%AE%E6%96%AF%2F%E5%85%A8%E6%9B%B2%E8%AF%95%E5%90%AC%2FMp3_64_22_16%2F60054701958153829.mp3',
            img: 'https://mcontent.migu.cn/newlv2/new/album/20191125/8591/s_KV3amA6En4HiVOkO.jpg'
          },{
            name: '戒烟',
            author: '李荣浩',
            url: 'https://freetyst.nf.migu.cn/public%2Fproduct9th%2Fproduct41%2F2020%2F08%2F1119%2F2018%E5%B9%B411%E6%9C%8801%E6%97%A512%E7%82%B935%E5%88%86%E6%89%B9%E9%87%8F%E9%A1%B9%E7%9B%AE%E5%8D%8E%E7%BA%B35%E9%A6%96-6%2F%E5%85%A8%E6%9B%B2%E8%AF%95%E5%90%AC%2FMp3_64_22_16%2F6005751J1EB191529.mp3',
            img: 'https://mcontent.migu.cn/newlv2/new/album/20210411/1108293901/s_zfrH7pOwVGNyc2nS.jpg'
          },{
            name: '想着你',
            author: '郭顶',
            url: 'https://freetyst.nf.migu.cn/public%2Fringmaker01%2Fn16%2F2016%2F12%2F2016%E5%B9%B411%E6%9C%8828%E6%97%A513%E7%82%B951%E5%88%86%E7%B4%A7%E6%80%A5%E5%86%85%E5%AE%B9%E5%87%86%E5%85%A5%E6%AD%A3%E4%B8%9C325%E9%A6%96%2F%E5%85%A8%E6%9B%B2%E8%AF%95%E5%90%AC%2FMp3_64_22_16%2F%E6%83%B3%E7%9D%80%E4%BD%A0-%E9%83%AD%E9%A1%B6.mp3',
            img: 'https://mcontent.migu.cn/newlv2/new/album/20191031/1004679958/s_W3SaefwJrgdvFAU2.jpg'
          },{
            name: 'Lose Yourself (Soundtrack Version)',
            author: 'Eminem',
            url: 'https://freetyst.nf.migu.cn/public%2Fproduct9th%2Fproduct43%2F2021%2F05%2F0618%2F2018%E5%B9%B409%E6%9C%8814%E6%97%A513%E7%82%B909%E5%88%86%E5%86%85%E5%AE%B9%E5%87%86%E5%85%A5%E6%AD%A3%E4%B8%9C992%E9%A6%96%2F%E5%85%A8%E6%9B%B2%E8%AF%95%E5%90%AC%2FMp3_64_22_16%2F6005661D29E180751.mp3',
            img: 'https://mcontent.migu.cn/newlv2/new/album/20210429/25054/s_IaEaJ69JWwgA3Dtl.jpg'
          }]

          res.send(music)
    })
    router.post('/musiclists',async(req,res)=>{
        const query = await  music.find({'url':req.body.url})
        if(query.length==0){
        const model = await music.create(req.body)
        }
        res.send('成功')
    })
    app.use('/chatroom/api',router)
}