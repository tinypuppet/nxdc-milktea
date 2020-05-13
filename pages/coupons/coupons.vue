<template>
	<view class="container position-relative w-100 h-100 overflow-hidden">
		<view class="exchange-box">
			<view class="input-box">
				<input type="text" placeholder="请输入兑换码" placeholder-class="text-color-assist font-size-base" />
				<button type="primary">兑换</button>
			</view>
			<view class="font-size-sm text-color-primary line-height-2">查看兑换规则</view>
		</view>
		<view class="tabbar">
			<view class="tab" :class="{active: activeTabIndex == index}" 
				v-for="(item, index) in tabs" :key="index" @tap="handleTab(index)">
				<view class="title">{{ item.title }}</view>
			</view>
		</view>
		<view class="flex-fill">
			<scroll-view scroll-y class="coupon-list">
				<view class="wrapper">
					<view class="coupon" v-for="(item, index) in coupons" :key="index" @tap="openDetailModal(item)">
						<view class="d-flex align-items-center detail">
							<image :src="item.imageUrl" class="coupon-img"></image>
							<view class="flex-fill d-flex flex-column just-content-center overflow-hidden">
								<view class="font-size-lg text-color-base text-truncate mb-10">{{ item.title }}</view>
								<view class="font-size-sm text-color-base">有效期至{{ item.endAt }}</view>
							</view>
						</view>
						<view class="d-flex align-items-center justify-content-end" style="height: 80rpx;">
							<view class="font-size-sm text-color-primary">查看详情</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="bottom-box d-flex align-items-center just-content-center font-size-sm text-color-primary">
			<view class="item">历史卡券</view>
			<view class="item" @tap="showTip1">赠送记录</view>
			<view class="item" @tap="showTip2">第三方权益</view>
		</view>
		<modal custom :show="detailModalVisible" @cancel="closeDetailModal" width="90%">
			<view class="modal-content">
				<view class="d-flex font-size-extra-lg text-color-base just-content-center mb-20">{{ coupon.title }}</view>
				<view class="d-flex font-size-sm text-color-base mb-20">
					有效期：{{ coupon.beginAt }}至{{ coupon.endAt }}
				</view>
				<pre class="pre-line font-size-sm text-color-assist mb-30">
					<jyf-parser ref="couponExplain"></jyf-parser>
				</pre>
				<view class="d-flex align-items-center just-content-center">
					<button type="primary" @tap="useCoupon" class="use-coupon-btn">立即使用</button>
				</view>
			</view>
		</modal>
	</view>
</template>

<script>
import modal from '@/components/modal/modal'
import jyfParser from "@/components/jyf-parser/jyf-parser"

export default {
	components: {
		modal,
		jyfParser
	},
	data() {
		return {
			tabs: [
				{title: '全部', value: 'all'},
				{title: '茶饮券', value: '1'},
				{title: '酒屋券', value: '2'}
			],
			activeTabIndex: '',
			coupons: [],
			detailModalVisible: false,
			coupon: {}
		}
	},
	onShow() {
		this.activeTabIndex = 0
	},
	watch: {
		activeTabIndex: async function(val) {
			const type = this.tabs[val].value
			await this.getCoupons(type)
		}
	},
	methods: {
		handleTab(index) {
			this.activeTabIndex = index
		},
		async getCoupons(type) {
			const coupons = await this.$api('customerCoupons')
			if(type == 'all') {
				this.coupons = coupons
			} else {
				this.coupons = coupons.filter(item => item.couponType == type)
			}
		},
		openDetailModal(coupon) {
			this.coupon = coupon
			this.$refs['couponExplain'].setContent(this.coupon.couponExplain || '')
			this.detailModalVisible = true
		},
		closeDetailModal() {
			this.detailModalVisible = false
			this.coupon = {}
		},
		useCoupon() {
			uni.switchTab({
				url: '/pages/menu/menu'
			})
		},
		showTip1() {
			uni.showToast({
				title: '您暂时还没有赠送中卡券哦~',
				icon: 'none'
			})
		},
		showTip2() {
			uni.showToast({
				title: '您暂时还没有券码哦~',
				icon: 'none'
			})
		}
	}
}
</script>

<style lang="scss" scoped>
/* #ifdef H5 */
page {
	height: 100%;
}
/* #endif */

.container {
	display: flex;
	flex-direction: column;
}

.exchange-box {
	flex-shrink: 0;
	height: 200rpx;
	background-color: #ffffff;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	.input-box {
		display: flex;
		align-items: stretch;
		width: 70%;
		flex-shrink: 0;
		input {
			flex: 1;
			height: 80rpx;
			border: 1rpx solid #eee;
			border-right: 0;
			border-radius: 8rpx 0 0 8rpx;
			padding: 20rpx;
			font-size: $font-size-base;
			color: $text-color-base;
		}
		button {
			border-radius: 0 8rpx 8rpx 0;
			display: flex;
			align-items: center;
		}
	}
}

.tabbar {
	flex-shrink: 0;
	width: 100%;
	height: 120rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	
	.tab {
		flex: 1;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: $font-size-base;
		color: $text-color-base;
		position: relative;
		
		.title {
			padding: 15rpx 0;
		}
		
		&.active {
			color: $color-primary;
			
			.title {
				border-bottom: 5rpx solid $color-primary;
			}
		}
	}
}

.bottom-box {
	height: 80rpx;
	flex-shrink: 0;
	.item {
		padding: 0 20rpx;
		position: relative;
		
		&::after {
			content: " ";
			border-right: 1rpx solid $text-color-assist;
			height: 100%;
			position: absolute;
			right: 0;
			top: 0;
			transform: scaleX(0.5) scaleY(0.8);
		}
		
		&:nth-last-child(1)::after {
			border-right: 0;
		}
	}
}

.coupon-list {
	height: calc(100vh - 80rpx - 120rpx - 200rpx);
	/* #ifdef H5 */
	height: calc(100vh - 80rpx - 120rpx - 200rpx - 44px);
	/* #endif */
}

.wrapper {
	padding: 0 40rpx;
	display: flex;
	flex-direction: column;
	
	.coupon {
		display: flex;
		flex-direction: column;
		background-color: #FFFFFF;
		margin-bottom: 30rpx;
		padding: 0 30rpx;
		border-radius: 6rpx;
		box-shadow: 0 10rpx 10rpx -10rpx rgba(15, 15, 15, 0.1);
		position: relative;
		
		&::before {
			content: "";
			position: absolute;
			background-color: $bg-color;
			width: 30rpx;
			height: 30rpx;
			bottom: 65rpx;
			left: -15rpx;
			border-radius: 100%;
		}
		
		&::after {
			content: "";
			position: absolute;
			background-color: $bg-color;
			width: 30rpx;
			height: 30rpx;
			bottom: 65rpx;
			right: -15rpx;
			border-radius: 100%;
		}
		
		.detail {
			padding: 20rpx 0;
			position: relative;

		    &::after {
				content: '';
				position: absolute;
				left: 0;
				right: 0;
				bottom: 0;
				border-bottom: 1rpx dashed #c6c6c6;
				transform: scaleY(0.5);
			}
			
			.coupon-img {
				width: 150rpx;
				height: 150rpx;
				margin-right: 40rpx;
			}
		}
	}
}

.use-coupon-btn {
	width: 95%;
	border-radius: 50rem !important;
}
</style>
