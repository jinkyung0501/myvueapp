<template>
  <section class="container">
    <form name="listFrm" id="listFrm" action ="./applyList.do" method="get">
    <input type="hidden" name="menuNo" value="${curMenu.menuNo}" >
    <input type="hidden" name="pageIndex" id="pageIndex" value="<c:out value='${paramVO.pageIndex}'/>"/>

    <table class="tbl-st1">
    <thead>
      <tr>
        <th scope="col" class="ck">선택</th>
        <th scope="col" class="no">번호</th>
        <th scope="col" class="block-pc">사이트ID</th>
        <th scope="col">폼메일명</th>
        <th scope="col" class="block-pc">작성자</th>
        <th scope="col" class="block-pc">접수일</th>
        <th scope="col" class="block-pc">담당자</th>
        <th scope="col">처리상태</th>
      </tr>
    </thead>
    <tbody>
    <!-- <c:forEach var="result" items="${resultList}" varStatus="status"> -->
    <a v-for="a in items" :key="a">
      <tr>
        <td>
          <input type="checkbox" name="chkData" value="1" title="폼메일 선택" id=""/>
        </td>

        <td>1</td>
        <td class="block-pc">{{ a.siteNM }}</td>
        <td class="tal-m"><nuxt-link :to="{path: 'view', query:{id: a.formSn}}">{{a.formNm}}</nuxt-link>
          <div class="bbs-list_m">
            <span><strong>사이트ID :</strong> {{ a.siteId }}</span>
            <span><strong>작성자 :</strong> {{ a.regUserId }}</span>
            <span><strong>접수일 :</strong> {{ a.regDate }}</span>
            <span><strong>담당자 :</strong> <c:out value="${result.adminId}"/></span>
          </div>
        </td>
        <td class="block-pc">{{ a.regUserId }}</td>
        <td class="block-pc">{{ a.regDate }}</td>
        <td class="block-pc"><c:out value="${result.adminId}"/></td>
        <td class="">
          <c:if test="${result.sttusCd eq 'READY'}">대기중</c:if>
          <c:if test="${result.sttusCd eq 'COMPLETE'}">
            처리완료
          </c:if>
        </td>
      </tr>
    </a>
    <!-- </c:forEach> -->
    </tbody>
    </table>
      <c:if test="${fn:length(resultList) eq 0}">
        <div class="no-data_bbs"><spring:message code="common.nodata.msg" /></div>
      </c:if>
    </form>

    <div class="text-right mt-3">
    <a href="/formMail/create" class="bg-black_r trans btn-st1">등록</a>
    <button type="button" class="bg-black_r trans btn-st1" onclick="createItem();" >선택삭제</button>
    </div>

    <form name="item" method="post" action="<c:url value='./applyView.do'/>">
      <input type="hidden" name="menuNo" value="${curMenu.menuNo}" />
      <input type="hidden" name="applySn" id="applySn"  value="" />
    </form>
    
  </section>

</template>

<script>
import axios from "axios";

export default {
name: 'list',
data: () => {
  return {
    items: []      // toDoItems를 빈 리스트로 초기화한다.
    //items: ''
  }
},
created () {           // 초기화 함수를 정의 한다.
  
  axios.get('http://192.168.1.23:8555/api/cms/v1/form-mails/', {
      headers: {
          Authorization : 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsIm5hbWUiOiLqtIDrpqzsnpAiLCJyb2xlIjoiQ01TIiwiaWF0IjoxNjczMzk3MDA2LCJleHAiOjE2NzQyNjEwMDZ9.AXN7wmtbCD8tN2meh6mrbaRC8FEmobeUNwCkwc4N_T2Fyha7I4qWEjmYgoCtTs5ITKeHAQ0W3CvJOIlJDemuPQ'
      }
  })
    .then(response => {
     //this.items = response.data.data.content[0].formNm;
     this.items = response.data.data.content;

    })
    .catch(e => {
      console.log('error : ', e)
    })
}
}

</script>

<style>


</style>