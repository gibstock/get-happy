const moviesDiv = document.getElementById('movies')
const movies = moviesDiv.querySelectorAll('.movie')
const contentDivs = document.querySelectorAll('.content')


moviesDiv.addEventListener('scroll', ()=> {
  for (const movie of movies) {
    if(movie.getBoundingClientRect().left <= window.innerWidth * 0.75 && movie.getBoundingClientRect().left > 0) {
      movie.classList.add('visible')
      handleContentChange(movie.dataset.movie)
    } else {
      movie.classList.remove('visible')
    }
  }
})

const handleContentChange = id => {
  if(!id) return

  for( const contentDiv of contentDivs) {
    console.log(contentDiv)
    contentDiv.classList.remove('visible')
  }

  document.getElementById(id).classList.add('visible')

}