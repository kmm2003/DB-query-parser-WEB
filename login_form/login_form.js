let main_page_display=()=>{ // 2초동안 로딩 후 메인페이지로 이동
    var loadingBox = document.querySelector('.loadingBox');
    setTimeout(()=>{
        loadingBox.style='display:none';
    },1000);
}
window.onload=()=>{
    var out_line = document.querySelector('.out_line');
    var name = document.querySelector('#name');
    var next = document.querySelector('#next');
    var name_page = document.querySelector('.name_page');
    var loadingBox = document.querySelector('.loadingBox');
    name.addEventListener('keyup', ()=>{
        if(name.value != ''){
            out_line.classList.add('existence');   
        }
    });
    name.addEventListener('blur',()=>{
        if(name.value!=''){
            out_line.classList.add('existence');
        }
        else{
            out_line.classList.remove('existence');  
        }
    })
    next.addEventListener('click',()=>{
        if(name.value == ''){
            alert('조치자를 입력해주세요!!!');
        }
        else{
            let conf=confirm('다음 페이지로 넘어가시겠습니까?');
            if(conf==true){
                name_page.style='display:none';
                loadingBox.style='display:block'; 
                main_page_display();
            }
        }
    })
}   