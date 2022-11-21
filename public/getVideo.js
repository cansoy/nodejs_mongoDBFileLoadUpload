const buttons=document.querySelectorAll('button')

const getLinks=async(e)=>{
    const url=e.target.nextElementSibling.innerText
    const response=await fetch("../data/namecansoy_surnametwo_f68179d3-0fff-4415-a406-f0b361bae77a_.mp4")
    const blob=await response.blob()
    console.log(blob)
}
// C:\Users\Muhammed Cansoy\Desktop\multer\data\namecansoy_surnametwo_f68179d3-0fff-4415-a406-f0b361bae77a_.mp4

buttons.forEach(item=>{
    item.addEventListener('click',getLinks)
})