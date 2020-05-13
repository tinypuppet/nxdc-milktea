<template>
	<view class="container">
		<navbar-back-button></navbar-back-button>
		<view class="header">
			<image src="/static/images/integrals/bg.png" mode="scaleToFill"></image>
			<view class="sign-in-info">
				<view class="left">
					<view class="d-flex align-items-baseline" @tap="flow">
						<image class="integral-icon" src="/static/images/integrals/integral.png"></image>
						<view class="number">{{ customPoints.totalPoints }}</view>
						<view class="font-size-base">积分</view>
						<view class="iconfont iconarrow-right line-height-100"></view>
					</view>
				</view>
				<view class="right">
					兑换记录
				</view>
			</view>
		</view>
		<view style="padding: 0 30rpx;">
			<view class="sign-in-box">
				<view class="text-color-base font-weight-bold font-size-lg" style="margin: 20rpx 0;">连续签到赚积分</view>
				<uni-steps :active="activeDay" :options="stepsOption"></uni-steps>
				<view class="d-flex flex-column align-items-center just-content-center" style="margin: 20rpx 0;">
					<button type="primary" class="sign-in-btn" @tap="attendance">签到</button>
					<view class="font-size-base text-color-primary" style="margin-top: 20rpx;">查看签到日历</view>
				</view>
			</view>
			
			<view class="banner">
				<image src="https://images.qmai.cn/s23107/2020/04/30/aed6cdb1db4712f87e.png" mode="widthFix"></image>
			</view>
			<!-- 积分商品列表 begin -->
			<view clas="d-flex flex-column" v-for="(items, cate) in pointsMall" :key="cate">
				<view class="d-flex justify-content-between align-items-center mb-30">
					<view class="font-size-lg text-color-base">{{ cate }}</view>
					<image src="/static/images/navigator.png" style="width: 40rpx; height: 40rpx;"></image>
				</view>
				<view class="d-flex flex-wrap justify-content-between">
					<block v-for="(item, key) in items" :key="key">
						<view class="d-flex bg-white flex-column align-items-stretch point-box" @tap="detail(cate, item.id)">
							<image :src="item.img.length ? item.img[0] : '/static/images/integrals/ticket.png'" class="w-100" mode="widthFix"></image>
							<view class="d-flex flex-column overflow-hidden">
								<view class="font-size-lg text-color-base text-truncate font-weight-bold" style="margin-bottom: 10rpx;">{{ item.goods_name }}</view>
								<view class="d-flex align-items-center">
									<view class="d-flex align-items-baseline">
										<view class="font-size-base text-color-primary mr-10">{{ item.points_price }}</view>
										<view class="font-size-sm text-color-assist">积分</view>
									</view>
									<view v-if="item.amount > 0" class="d-flex align-items-center font-size-sm text-color-assist" style="margin: 0 10rpx;">+</view>
									<view  v-if="item.amount > 0"class="d-flex align-items-baseline">
										<view class="font-size-base text-color-primary mr-10">{{ parseFloat(item.amount) }}</view>
										<view class="font-size-sm text-color-assist">元</view>
									</view>
								</view>
								<view class="font-size-sm text-color-assist">剩余{{ item.goods_stock }}件</view>
							</view>
						</view>						
					</block>
				</view>
			</view>
			<!-- 积分商品列表 end -->
		</view>
	</view>
</template>

<script>
	import navbarBackButton from '@/components/navbar-back-button'
	import uniSteps from '@/components/uni-steps/uni-steps'
	
	export default {
		components: {
			navbarBackButton,
			uniSteps
		},
		data() {
			return {
				customPoints: {},
				stepsOption: [],
				activeDay: 0,
				pointsMall: []
			}
		},
		async onLoad() {
			await this.getStepsOptions()
			this.customPoints = await this.$api('customPoints')
			await this.getPointsMall()
		},
		methods: {
			async getStepsOptions() {
				let stepsOptions = []
				
				const attendance = await this.$api('attendance')
				
				attendance.forEach((item, index) => {
					if(item.is_day) {
						this.activeDay = index
					}
					
					let arr = {
						title: item.day_name + '天',
						desc: '+' + item.points
					}
					if(index == attendance.length - 1) {
						arr.circle = '/static/images/integrals/goal.png'
						arr.circleStyle = 'width: 47rpx; height: 39rpx;'
					}
					
					stepsOptions.push(arr)
				})
				
				this.stepsOption = stepsOptions
			},
			async getPointsMall() {
				this.pointsMall = await this.$api('pointsMall')
			},
			attendance() {
				uni.navigateTo({
					url: '/pages/attendance/attendance'
				})
			},
			flow() {
				uni.navigateTo({
					url: '/pages/integrals/flow'
				})
			},
			detail(cate, id) {
				uni.navigateTo({
					url: '/pages/integrals/detail?cate=' + cate + '&id=' + id
				})
			}
		}
	}
</script>

<style lang="scss" lang="scss">
.header {
	position: relative;
	width: 100%;
	height: 33.333vh;
	
	image {
		width: 100%;
		height: 100%;
	}
}

.sign-in-info {
	position: absolute;
	width: 100%;
	height: 33.333vh;
	display: flex;
	align-items: center;
	top: 0;
	left: 0;
	
	.left {
		color: #FFFFFF;
		margin-left: 40rpx;
		flex: 1;
		display: flex;
		
		.integral-icon {
			width: 64rpx;
			height: 64rpx;
			margin-right: 20rpx;
		}
		
		.number {
			font-size: 80rpx;
			margin-right: 10rpx;
		}
	}
	
	.right {
		background-color: #FFFFFF;
		color: $color-primary;
		font-size: $font-size-base;
		border-radius: 50rem 0 0 50rem;
		padding: 10rpx 30rpx;
	}
}

.sign-in-box {
	position: relative;
	background-color: #FFFFFF;
	margin-top: -90rpx;
	margin-bottom: 30rpx;
	width: 100%;
	border-radius: 8rpx;
	box-shadow: 0 0 20rpx rgba($color: #000000, $alpha: 0.1);
	padding: 20rpx;
	display: flex;
	flex-direction: column;
	
	.sign-in-btn {
		width: 50%;
		border-radius: 50rem !important;
	}
}

.banner {
	width: 100%;
	margin: 30rpx 0;
	border-radius: 8rpx;
	
	image {
		width: 100%;
	}
}

.point-box {
	width: 49%;
	margin-bottom: 30rpx;
	border-radius: 8rpx;
	padding: 20rpx;
}
</style>
