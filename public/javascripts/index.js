let coll = document.getElementsByClassName("button-collapse");
let i;

for (i=0; i<coll.length; i++) {
	
	coll[i].addEventListener("click", function() {
	
		this.classList.toggle("active");
		let content = this.parentElement.nextElementSibling;
    
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  });
}
