import Vue from 'vue'
import {
  Button,
  Input,
  FormItem,
  Form,
  Message,
  Container,
  Header,
  Aside,
  Main,
  Menu,
  Submenu,
  MenuItemGroup,
  MenuItem,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Row,
  Col,
  Table,
  TableColumn,
  Switch,
  Tooltip,
  Pagination,
  Dialog,
  MessageBox,
  Tag,
  Tree
} from 'element-ui'
//  登录
Vue.use(Input)
Vue.use(Button)
Vue.use(FormItem)
Vue.use(Form)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
//  主页
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
// Vue.use(Message) 全局提示框
Vue.prototype.$message = Message
// 确认框
Vue.prototype.$confirm = MessageBox
// 用户列表
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Tree)
