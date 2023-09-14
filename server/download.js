import ytdl from 'ytdl-core'
import fs from 'fs'

export const download = (videoId) => new Promise((resolve, reject) => {
  const videoURL = "https://www.youtube.com/shorts/" + videoId
  console.log('Realizando o download do vídeo: ', videoId)
  ytdl(videoURL, {quality: "lowestaudio", filter: "audioonly"})
  .on("info", (info)=>{
    const seconds = info.formats[0].approxDurationMs / 1000
    if (seconds > 60){
      throw new Error('Esse vídeo não é um shorts')
    }
  }).on('end', ()=>{
    console.log('Download finalizado')
    resolve()
  })
  .on("error", (error)=>{
    console.log("Não foi possível fazer o download do video. Detalhes do erro: ", error)
    reject(error)
  }).pipe(fs.createWriteStream('./tmp/audio.mp4'))
})