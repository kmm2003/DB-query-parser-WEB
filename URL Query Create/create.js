/* 앞으로 나올 데이터베이스, 테이블 ,속성 관련한 문구들은 전부 다 예제이다 */

var all_count=0; // 차단 조치할 URL 총 갯수 counting 하는 변수
function manual_open(){ // 메뉴얼 열고 닫고 하는 함수
    if(document.getElementById('manual').style.display=='none'){
        document.getElementById('manual').style.display='block';
        document.getElementById('manual_b').textContent='Manual_Close';
    }
    else{
        document.getElementById('manual').style.display='none';
        document.getElementById('manual_b').textContent='Manual';
    }
}

function select(){ // SQL select 관련 함수
    var result='USE[데이터베이스]\nGO\nselect * from [테이블]';
    if(document.getElementById('input').value==''){ // DB 전체 목록 확인 쿼리
        document.getElementById('output').value=result;
        alert('[테이블] 레코드 전체 출력 쿼리 생성');
        return
    }
    else{
        document.getElementById('input').value+='\n';
        var input=document.getElementById('input').value.split('\n');
        for(i=0;i<input.length;i++){ // input 각 줄마다 공백 제거
            for(j=0;j<30;j++){
                if(input[i].indexOf('')==0){
                    input[i]=input[i].replace(' ','');
                }
                else{
                    break
                }
            }
            if(input[i]==''){ // 값이 없는 줄은 필터링
                continue
            }
            if(input[i].indexOf('*')==-1){
                input[i]+='*';
            }
            if(i==0){
                result+=" where [속성]='"+input[i]+"'";
                all_count++;
            }
            else{
                result+=" or [속성]='"+input[i]+"'";
                all_count++;
            }
        }
        document.getElementById('output').value=result;
    }
    alert('URL 차단 목록 쿼리 '+all_count+'개 생성 완료');
}

function delete_q(num){ // SQL delete 관련 함수
    var count=0;
    var input=document.getElementById('input').value;
    var output=document.getElementById('output');
    var input_d=input.split('\n');
    var result='';
    result='USE[데이터베이스]\nGO\ndelete from [테이블] where [속성]=';
    if(document.getElementById('input').value==''&&num==1){ // 테이블 데이터 전부 삭제 쿼리 생성
        output.value='USE[데이터베이스]\nGO\ndelete [테이블]';
        alert('테이블 데이터 전체 삭제 쿼리 생성');
        return -1
    }
    for(i=0;i<input_d.length;i++){ // 이하 코드는 SELECT와 동일
        for(j=0;j<30;j++){
            if(input_d[i].indexOf(' ')==0){
                input_d[i]=input_d[i].replace(' ','');
            }
            else{
                break
            }
        }
        if(input_d[i]==''){
            continue
        }
        if(i==0){
            result+="'"+input_d[i]+"'";
            all_count++;
        }
        else if((i+1)%1000==0){ // MS SQL 쿼리 한번당 최대 1000개까지 삽입 가능 따라서 1000개씩 나눠서 쿼리 생성
            result+='\n\n\nUSE[데이터베이스]\nGO\ndelete [테이블] where [속성]=';
            result+="'"+input_d[i]+"'";
            all_count++;
        }
        else{
            result+=" or [속성]='"+input_d[i]+"'";
            all_count++;
        }
    }
    output.value=result;
}

function insert(){
    var count=0;
    var input=document.getElementById('input').value;
    var output=document.getElementById('output');
    var input_d=input.split('\n');
    var result='';
    result+='\n\n\nUSE[데이터베이스]\nGO\ninsert into [테이블](속성1,속성2,속성3) values'; // 속성1이 URL 속성이라 가정
    if(document.getElementById('input').value==''){ // input 값이 없는 경우 경고문 출력
        output.value='';
        alert('입력값을 넣어주세여!!');
        return -1
    }
    for(i=0;i<input_d.length;i++){ // 이하 코드는 DELETE와 동일
        for(j=0;j<30;j++){
            if(input_d[i].indexOf(' ')==0){
                input_d[i]=input_d[i].replace(' ','');
            }
            else{
                break
            }
        }
        if(input_d[i]==''){
            continue
        }
        if(i==0){
            result+="('"+input_d[i]+"',[속성2 값],[속성3 값])";
        }
        else if((i+1)%1000==0){
            result+='\n\n\nUSE[데이터베이스]\nGO\ninsert into [테이블] ([속성1],[속성2],[속성3]) values';
            result+="('"+input_d[i]+"',[속성2 값],[속성3 값])";
        }
        else{
            result+="('"+input_d[i]+"',[속성2 값],[속성3 값])";
        }
    }
    output.value+=result;
}

function algorithm1(){ // insert 버튼 동작
    delete_q(0);
    if(insert()==-1){
        return
    }
    alert('URL 차단 쿼리'+all_count+'개 생성');
    all_count=0;
}

function algorithm2(){ // delete 버튼 동작
    if(delete_q(1)==-1){
        return
    }
    alert('URL 차단해제 쿼리'+all_count+'개 생성');
    all_count=0;
}

function reset(){
    document.getElementById('input').value='';
    document.getElementById('output').value='';
    alert('리셋완료');
}