// module.exports = (app) =>{

    // const express = require('express')
    const puppeteer = require('puppeteer');


    (async ()=>{
    
        const browser = await puppeteer.launch({headless:false})
        const page = await browser.newPage()
        await page.goto('https://m.music.migu.cn/v3')

        const musicname = '一路向北'
        const author ='周杰伦'

        await page.waitForSelector('#search-input')

        await (await page.$('#search-input')).click()

        await page.waitForSelector('#researchBox')
        const searchinput = await page.$('#researchBox')
        await searchinput.type(musicname,{delay:100})

        await (await page.$('#researchBtn')).click()

        await page.waitForSelector('#index_section')

        
        //获得前三条
        const musicLists =[]
        for(let i = 1;i<3;i++){
            await page.waitForSelector(`#index_section > div.song.nav_list.song_list > div:nth-child(${i}) > div.music_name.clearfix > div.audio_div > span`)
            musicLists[i] = await page.$eval(`#index_section > div.song.nav_list.song_list > div:nth-child(${i}) > div.music_name.clearfix > div.audio_div > span`,item=>item.getAttribute('src'))
        }
        console.log(musicLists)
        // const musicSec = await page.$('body > div.seainput_div > div > input')
        
        // await  musicSec.type(musicname,{delay:100})


    

        // await browser.close();
    })()

// }