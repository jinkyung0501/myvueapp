<template>
  <section class="container">
    <h2>기본정보</h2>
    <form name="createFrm" id="createFrm" action="" method="post">

      <div class="row">
        <div class="col-12">
          <table class="table table-bordered">
            <colgroup>
              <col width="15%">
              <col width="35%">
              <col width="15%">
              <col width="35%">
            </colgroup>
            <tbody>

              <tr>
                <th>번호</th>
                <td colspan="3">
                  {{ items.formSn }}
                </td>
              </tr>

              <tr>
                <th>사이트 </th>
                <td colspan="3">
                  <select v-model="items.siteId">
                    <option value="">선택</option>
                    <option v-for="a in siteIdArr" :key="a">{{ a }}</option>
                  </select>
                </td>
              </tr>
              <tr>
                <th>폼메일 코드</th>
                <td>
                  <input class="form-control w-25" v-model="items.code">
                </td>
                <th>폼메일 명</th>
                <td>
                  <input class="form-control w-25" v-model="items.formNm">
                </td>
              </tr>
              <tr>
                <th>동의서 선택</th>
                <td colspan="3">
                  <select v-model="items.agreCd">
                    <option value="">선택</option>
                    <option v-for="a in agreCdArr" :key="a">{{ a }}</option>
                  </select>
                </td>
              </tr>
              <tr>
                <th>비밀번호 사용</th>
                <td colspan="3">
                  <input type="radio" name="pwAt" id="pwAt_N" value="N" v-model="items.pwAt" />
                  <label for="pwAt_N">미사용</label>
                  <input type="radio" name="pwAt" id="pwAt_Y" value="Y" v-model="items.pwAt" />
                  <label for="pwAt_Y">사용</label>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </form>

    <button @click="updateItem">수정</button><br />
    <!-- <button @click="deleteItem">삭제</button><br/> -->
    <nuxt-link to="/list">목록</nuxt-link>





  </section>
</template>

<script>
import axios from "axios";

export default {
  data: () => {
    return {
      items: [],
      siteIdArr: ['oktomato', 'test'],
      agreCdArr: ['AGRE_001'],
      validOk: true
    }
  },
  created() {
    this.query = this.$route.query.id;
    axios.get('http://192.168.1.23:8555/api/cms/v1/form-mails/' + this.query, {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsIm5hbWUiOiLqtIDrpqzsnpAiLCJyb2xlIjoiQ01TIiwiaWF0IjoxNjczMjI3MTY2LCJleHAiOjE2NzQwOTExNjZ9.VLkzvmokH0dOui9Ime5xxknZ-HiDHy0iqr_5VPyVoESbD8zpqUuoBLTYHBJRAhnP8oQWeHfQ7OK0jwjLwbmgGg'
      }
    })
      .then(response => {
        this.items = response.data.data;

        //console.log(response.data.data);

      })
      .catch(e => {
        console.log('error : ', e)
      })
  },
  methods: {
    validateInput(){
      if(this.items.siteId == ''){
        this.validOk = false;
        alert("사이트 아이디는 필수값");
        
      }else if(this.items.code == ''){
        this.validOk = false;
        alert("폼메일 코드는 필수값");
      }    
      else{
        this.validOk = true;
      }
    },

    updateItem() {
      this.validateInput();

      let jsonData = {
        agreCd: this.items.agreCd,
        code: this.items.code,
        formNm: this.items.formNm,
        formSn: this.items.formSn,
        modUserId: '',
        pwAt: this.items.pwAt,
        siteId: this.items.siteId
      };

      if(this.validOk==true){
        axios({
        method: "put",
        url: 'http://192.168.1.23:8555/api/cms/v1/form-mails/' + this.query,
        params: jsonData,
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsIm5hbWUiOiLqtIDrpqzsnpAiLCJyb2xlIjoiQ01TIiwiaWF0IjoxNjczMjI3MTY2LCJleHAiOjE2NzQwOTExNjZ9.VLkzvmokH0dOui9Ime5xxknZ-HiDHy0iqr_5VPyVoESbD8zpqUuoBLTYHBJRAhnP8oQWeHfQ7OK0jwjLwbmgGg'
        }
      })

        .then(response => {
          console.log(response);
          if (response.status == 200) {
            this.$router.push("/formMail/list");
          }


        })
        .catch(e => {
          console.log('error : ', e)
        })
      }
      

    }

    /*
    deleteItem() {
      axios.delete('http://192.168.1.23:8555/api/cms/v1/form-mails/'+this.query,
            {
            headers: {
                Authorization : 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsIm5hbWUiOiLqtIDrpqzsnpAiLCJyb2xlIjoiQ01TIiwiaWF0IjoxNjczMjI3MTY2LCJleHAiOjE2NzQwOTExNjZ9.VLkzvmokH0dOui9Ime5xxknZ-HiDHy0iqr_5VPyVoESbD8zpqUuoBLTYHBJRAhnP8oQWeHfQ7OK0jwjLwbmgGg'
            }
        })
      .then(response => {
        console.log(response);
       
  
      })
      .catch(e => {
        console.log('error : ', e)
      })
      
    }*/

  }

}
</script>