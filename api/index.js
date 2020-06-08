import packages from './packages'
import store from './store'
import goods from './goods'
import levelBenefits from './level-benefits'
import member from './member'
import rechargeCards from './rechargeCards'
import addresses from './addresses'
import attendance from './attendance'
import customPoints from './custom-points'
import pointsMall from './points-mall'
import attendanceList from './attendance-list'
import todayAttendance from './today-attendance'
import orders from './orders'
import customerCoupons from './customer-coupons'
import giftCards from './gift-cards'

const json = {
	packages,
	store,
	goods,
	levelBenefits,
	member,
	rechargeCards,
	addresses,
	attendance,
	customPoints,
	pointsMall,
	attendanceList,
	todayAttendance,
	orders,
	customerCoupons,
	giftCards
}

export default (name) => new Promise(resolve => resolve(json[name]), 500)