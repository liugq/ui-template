<template>
  <div class="l-main-container">
    <div class="header">
    <div style="clear:both;">
      <div class="float-left">
        <div class="btn-group">
          <button type="button" class="btn btn-link dropdown-toggle text-secondary" data-toggle="dropdown">
            <i class="fas fa-home fa-icon--left"></i>主页
          </button>
          <div class="dropdown-menu dropdown-menu-right-imp l-box-shadow">
            <a class="dropdown-item list-group-item l-list-item bg-light" href="#" v-for="(item,index) in home" :key="index">
              <i class="fas fa-paperclip fa-icon--left-2x"></i>{{item.name}}</a>
          </div>
        </div>
        <span class="text-muted">|</span>
        <button type="button" class="btn btn-link text-secondary">
          <i class="fas fa-user fa-icon--left"></i>个人工作台
        </button>
        <!-- 职能频道 -->
        <span class="text-muted">|</span>
        <div class="btn-group">
          <button type="button" class="btn btn-link dropdown-toggle text-secondary" data-toggle="dropdown">
            <i class="fas fa-hands-helping fa-icon--left"></i>职能频道
          </button>
          <div class="dropdown-menu dropdown-menu-right-imp l-box-shadow">
            <a class="dropdown-item list-group-item l-list-item bg-light" href="#" v-for="(item,index) in zhineng" :key="index">
              <i class="fas fa-paperclip fa-icon--left-2x"></i>{{item.name}}</a>
          </div>
        </div>
        <!-- 营销中心 -->
        <span class="text-muted">|</span>
        <div class="btn-group">
          <button type="button" class="btn btn-link dropdown-toggle text-secondary" data-toggle="dropdown">
            <i class="fas fa-glass-cheers fa-icon--left"></i>营销中心
          </button>
          <div class="dropdown-menu dropdown-menu-right-imp l-box-shadow" z-index="1000">
             <div class="d-flex flex-row">
                <div v-for="nn in 6" :key="nn">
            <a class="dropdown-item list-group-item l-list-item bg-light" href="#" v-for="(item,index) in sales" :key="index" v-if="nn==item.ca">
              <i class="fas fa-paperclip fa-icon--left-2x"></i>{{item.name}}
            </a>
             </div>
          </div>
        </div>
        <!-- 制造中心 -->
        <span class="text-muted">|</span>
        <div class="btn-group">
          <button type="button" class="btn btn-link dropdown-toggle text-secondary" data-toggle="dropdown">
            <i class="fas fa-industry fa-icon--left"></i>制造中心
          </button>
          <div class="dropdown-menu dropdown-menu-right-imp l-box-shadow" >
            <div class="d-flex flex-row">
            <div v-for="n in 9" :key="n">
              <a class="dropdown-item list-group-item l-list-item bg-light" href="#" v-for="(item,index) in industry" :key="index" v-if="n==item.ca">
              <i class="fas fa-paperclip fa-icon--left-2x"></i>{{item.name}}</a>
            </div>
            </div>
            </div>
          </div>
        </div>
        <!-- 金融频道 -->
        <span class="text-muted">|</span>
        <button type="button" class="btn btn-link text-secondary">
          <i class="fas fa-coins fa-icon--left"></i>金融频道
        </button>
        <!-- 经营性公司 -->
        <span class="text-muted">|</span>
        <div class="btn-group">
          <button type="button" class="btn btn-link dropdown-toggle text-secondary" data-toggle="dropdown">
            <i class="fas fa-copyright fa-icon--left"></i> 经营性公司
          </button>
          <div class="dropdown-menu dropdown-menu-right-imp l-box-shadow">
            <a class="dropdown-item list-group-item l-list-item bg-light" href="#" v-for="(item,index) in jingying" :key="index">
              <i class="fas fa-paperclip fa-icon--left-2x"></i>{{item.name}}</a>
          </div>
        </div>
        <!-- 集团频道 -->
        <span class="text-muted">|</span>
        <button type="button" class="btn btn-link text-secondary">
          <i class="fas fa-users fa-icon--left"></i>集团频道
        </button>
        <span class="text-secondary" style="padding-left:18px;">公司总部>信息管理总部 > 刘国强</span>
      </div>
      <div class="float-right" >
        <button type="button" class="btn btn-link text-white">
          <i class="fas fa-key fa-icon--left"></i>修改密码
        </button>
        <span class="text-muted">|</span>
        <button type="button" class="btn btn-link text-white">
          <i class="fas fa-sign-out-alt fa-icon--left"></i>注销
        </button>
      </div>
</div>
    <div id="logo" style="clear:both;padding-left:6px;">
      <h1 class="font-weight-bold text-muted">
      <img src="/img/tsingtao-logo.png" alt="tsingtao beer" style="width:62px;height:48px;">
      <span class="align-middle" style="padding-left:8px;">青岛啤酒企业信息门户</span>
      </h1>
    </div>
    <div class="btn-group" role="group">
      <button type="button" class="btn btn-success"><i class="fas fa-newspaper fa-icon--left"></i>新闻中心</button>
      <button type="button" class="btn btn-outline-success"><i class="fas fa-drafting-compass fa-icon--left"></i>制度流程</button>
      <button type="button" class="btn btn-outline-success"><i class="fas fa-thumbs-up fa-icon--left"></i>创新管理</button>
      <button type="button" class="btn btn-outline-success"><i class="fas fa-book-open fa-icon--left"></i>知识共享</button>
      <button type="button" class="btn btn-outline-success"><i class="fas fa-flag fa-icon--left"></i>党风廉政</button>
      <button type="button" class="btn btn-outline-success"><i class="fas fa-microphone-alt fa-icon--left"></i>会议管理</button>
    </div>
  </div>

  <br/><br/><br/><br/><br/><br/>

    <h1>Index</h1>
    <h1>主页</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'index',
  data () {
    return {
      items: [
        { name: '雷军' },
        { name: '马云' },
        { name: '马化腾' },
        { name: '刘强东' },
        { name: '李彦宏' }
      ],
      home: [
        { name: '公司主页' },
        { name: '个人主页' }
      ],
      zhineng: [
        { name: '安全环保' },
        { name: '生产技术' },
        { name: '采购管理' },
        { name: '销售管理' },
        { name: '品牌管理' },
        { name: '物流管理' },
        { name: '战略投资' },
        { name: '财务管理' },
        { name: '人力资源' },
        { name: '企业策划' },
        { name: '信息管理' },
        { name: '内控审计部' },
        { name: '公共关系' },
        { name: '法律事务' },
        { name: '总裁办' },
        { name: '党群/企业文化' },
        { name: '行政中心' },
        { name: '市场发展部' },
        { name: '客服中心' },
        { name: '制造监控/纪检' },
        { name: '质量控制' },
        { name: '科研开发中心' },
        { name: '信访办/武装部' }
      ],
      sales: [
        { name: '营销中心主页', ca: 1 },
        { name: '华南营销主页', ca: 1 },
        { name: '上海实业主页 ', ca: 1 },
        { name: '上海销售主页 ', ca: 1 },
        { name: '江苏销售主页 ', ca: 1 },
        { name: '东南营销主页 ', ca: 1 },
        { name: '黑龙江营销主页', ca: 2 },
        { name: '湖北销售主页 ', ca: 2 },
        { name: '甘肃销售主页 ', ca: 2 },
        { name: '湖南销售主页 ', ca: 2 },
        { name: '安徽销售主页 ', ca: 2 },
        { name: '陕西销售主页 ', ca: 2 },
        { name: '四川销售主页 ', ca: 3 },
        { name: '北京销售主页 ', ca: 3 },
        { name: '山东省区主页 ', ca: 3 },
        { name: '辽宁省区主页 ', ca: 3 },
        { name: '山西省区主页 ', ca: 3 },
        { name: '河北省区主页 ', ca: 3 },
        { name: '河南省区主页 ', ca: 4 },
        { name: '吉林省区主页 ', ca: 4 },
        { name: '蒙东省办主页 ', ca: 4 },
        { name: '新疆省办主页 ', ca: 4 },
        { name: '蒙西省办主页 ', ca: 4 },
        { name: '贵州省办主页 ', ca: 4 },
        { name: '重庆省办主页 ', ca: 5 },
        { name: '云南省办主页 ', ca: 5 },
        { name: '广西省区主页 ', ca: 5 },
        { name: '江西省区主页 ', ca: 5 },
        { name: '浙江省区主页 ', ca: 5 },
        { name: '海南省区主页 ', ca: 5 },
        { name: '新银麦营销主页 ', ca: 6 }
      ],
      industry: [
        { name: '啤酒厂', ca: 1 }, { name: '二厂', ca: 1 }, { name: '四厂', ca: 1 }, { name: '麦芽厂', ca: 1 }, { name: '五厂', ca: 1 }, { name: '荣成', ca: 1 }, { name: '三厂', ca: 1 },
        { name: '寿光', ca: 2 }, { name: '鞍山', ca: 2 }, { name: '台州', ca: 2 }, { name: '潍坊', ca: 2 }, { name: '日照', ca: 2 }, { name: '薛城', ca: 2 }, { name: '滕州', ca: 2 },
        { name: '菏泽', ca: 3 }, { name: '济南', ca: 3 }, { name: '徐州', ca: 3 }, { name: '彭城', ca: 3 }, { name: '宿迁', ca: 3 }, { name: '芜湖', ca: 3 }, { name: '马鞍山', ca: 3 },
        { name: '松江', ca: 4 }, { name: '扬州', ca: 4 }, { name: '珠海', ca: 4 }, { name: '三水', ca: 4 }, { name: '深青啤', ca: 4 }, { name: '南宁', ca: 4 }, { name: '郴州', ca: 4 },
        { name: '黄石', ca: 5 }, { name: '长沙', ca: 5 }, { name: '西安', ca: 5 }, { name: '渭南', ca: 5 }, { name: '汉中', ca: 5 }, { name: '榆林', ca: 5 }, { name: '三环', ca: 5 },
        { name: '五星', ca: 6 }, { name: '甘肃', ca: 6 }, { name: '武威', ca: 6 }, { name: '福州', ca: 6 }, { name: '漳州', ca: 6 }, { name: '厦门', ca: 6 }, { name: '泸州', ca: 6 },
        { name: '成都', ca: 7 }, { name: '兴凯湖', ca: 7 }, { name: '哈尔滨', ca: 7 }, { name: '揭阳', ca: 7 }, { name: '太原', ca: 7 }, { name: '石家庄', ca: 7 }, { name: '杭州', ca: 7 },
        { name: '韶关', ca: 8 }, { name: '九江', ca: 8 }, { name: '洛阳', ca: 8 }, { name: '新银麦', ca: 8 }, { name: '杨浦', ca: 8 }, { name: '闵行', ca: 8 }, { name: '昆山', ca: 8 },
        { name: '绿兰莎', ca: 9 }, { name: '连云港', ca: 9 }
      ],
      jingying: [
        { name: '文化公司' }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'iconsWithTheme'
    ]
    )
  }
}
</script>
<style lang="scss" scoped>
.header{
  background-image: url('/img/bg.png');
  background-repeat: no-repeat;
  background-position:top right;
  background-size: contain;
}
.list-group-item:first-child1 {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.list-group-item:last-child1 {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
