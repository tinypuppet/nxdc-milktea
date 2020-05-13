<template>
	<view class="container" style="padding: 20rpx 30rpx;">
		<view class="w-100 d-flex flex-column">
			<view class="d-flex just-content-center align-items-center">
				<view class="avatar-wrapper">
					<image :src="member.avatar"></image>
					<view class="tag">
						<image src="/static/images/mine/level.png" mode="widthFix"></image>
						<view>{{ member.memberLevel }}</view>
					</view>
				</view>
			</view>
			<!-- user box begin -->
			<view class="user-box">
				<view class="d-flex just-content-center text-color-assist font-size-base font-weight-bold mb-30">{{ member.nickname }}</view>
				<!-- user grids begin -->
				<view class="w-100 d-flex font-size-sm text-color-assist mb-30">
					<view class="user-grid" @tap="coupons">
						<view class="value">{{ member.couponNum }}</view>
						<view>奈雪券</view>
					</view>
					<view class="user-grid" @tap="integrals">
						<view class="value">{{ member.pointNum }}</view>
						<view>积分</view>
					</view>
					<view class="user-grid" @tap="balance">
						<view class="value">{{ member.balance }}</view>
						<view>余额</view>
					</view>
					<view class="user-grid">
						<view class="value">{{ member.giftBalance }}</view>
						<view>礼品卡</view>
					</view>
				</view>
				<!-- user grids end -->
				<!-- qrcode begin -->
				<view class="qrcode d-flex just-content-center align-items-center"><canvas canvas-id="memberCode" style="width: 350rpx; height: 350rpx;"></canvas></view>
				<!-- qrcode end -->
				<view class="tips d-flex just-content-center align-items-center" style="margin-bottom: 50rpx;">
					<view class="font-size-sm text-color-assist">支付前出示可累计积分，会员码每30秒更新</view>
				</view>
				<!-- #ifdef MP-WEIXIN -->
				<view class="d-flex just-content-center align-items-center">
					<button type="primary" class="wepay-btn" hover-class="none">
						<image src="/static/images/mine/wechat.png"></image>
						<view>使用微信支付</view>
					</button>
				</view>
				<!-- #endif -->
			</view>
			<!-- user box end -->
		</view>
		<image src="https://img-shop.qmimg.cn/s16/images/2020/04/26/4a36d33657677787.png" class="w-100" mode="widthFix"></image>
	</view>
</template>

<script>
import {mapState} from 'vuex'
import uQRCode from '@/common/uqrcode'

export default {
	data() {
		return {
		}
	},
	onShow() {
		let i = 1
		this.makeMemberCode(i)
		
		setInterval(() => {
			i++
			this.makeMemberCode(i)
		}, 30000)
	},
	computed: {
		...mapState(['member'])
	},
	methods: {
		makeMemberCode(i) {
			uQRCode.make({
				canvasId: 'memberCode',
				componentInstance: this,
				text: `memberCode${i}`,
				size: uni.upx2px(350),
				margin: 20,
				backgroundColor: '#ffffff',
				foregroundColor: '#000000',
				fileType: 'jpg',
				correctLevel: uQRCode.defaults.correctLevel,
				success: res => {
					console.log(res)
				}
			})
		},
		integrals() {
			uni.navigateTo({
				url: '/pages/integrals/integrals'
			})
		},
		balance() {
			uni.navigateTo({
				url: '/pages/balance/balance'
			})
		},
		coupons() {
			uni.navigateTo({
				url: '/pages/coupons/coupons'
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.avatar-wrapper {
	width: 150rpx;
	height: 150rpx;
	border-radius: 100%;
	background-color: #ffffff;
	box-shadow: 0 0 20rpx rgba($color: #000000, $alpha: 0.1);
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	z-index: 10;

	image {
		width: 130rpx;
		height: 130rpx;
		border-radius: 100%;
	}

	.tag {
		background-color: #ffffff;
		position: absolute;
		right: -30rpx;
		bottom: -6rpx;
		display: flex;
		align-items: center;
		color: $color-warning;
		font-size: 22rpx;
		padding: 6rpx 16rpx;
		border-radius: 50rem !important;
		box-shadow: 2rpx 2rpx 20rpx rgba($color: #000000, $alpha: 0.1);
		image {
			width: 26rpx;
		}
	}
}

.user-box {
	width: 100%;
	position: relative;
	border-radius: 8rpx;
	background-color: #ffffff;
	margin-top: -75rpx;
	padding-top: 105rpx;
	padding-bottom: 75rpx;
	margin-bottom: 30rpx;
	box-shadow: 0 0 20rpx rgba($color: #000000, $alpha: 0.1);
}

.user-grid {
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;

	&::after {
		content: ' ';
		position: absolute;
		right: 0;
		top: 0;
		height: 100%;
		border-right: 1rpx solid $text-color-assist;
		transform: scaleX(0.2) scaleY(0.5);
	}

	&:nth-last-child(1)::after {
		border-right: 0;
	}

	.value {
		font-size: $font-size-base;
		font-weight: bold;
		margin-bottom: 10rpx;
	}
}

.wepay-btn {
	background-color: #57b737;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 5rpx 50rpx;

	image {
		width: 36rpx;
		height: 30rpx;
		margin-right: 10rpx;
	}
}
</style>
