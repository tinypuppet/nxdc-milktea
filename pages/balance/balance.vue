<template>
	<view class="container bg-white w-100 h-100">
		
		<view style="padding-bottom: 220rpx;">
			
			<view class="balance-info d-flex justify-content-between">
				<view class="flex-fill d-flex flex-column align-items-between justify-content-between">
					<view class="font-size-sm text-color-base">账户余额（元）</view>
					<view class="font-size-extra-lg text-color-base font-weight-bold">0</view>
					<view class="font-size-sm text-color-primary">交易记录</view>
				</view>
				<image src="/static/images/balance.png"  mode="widthFix"></image>
			</view>
			
			<view class="font-size-lg text-color-base font-weight-bold" style="margin-bottom: 20rpx;">储值金额</view>
			
			<view class="d-flex flex-wrap justify-content-between amounts">
				<view class="d-flex align-items-center just-content-center amount" 
					 :class="{'bg-primary text-color-white': item.selected, 'bg-base text-color-base': !item.selected}"
					  v-for="(item, index) in amounts" :key="index" @tap="handleSelected(index)">
					<view class="font-size-extra-lg font-weight-bold">{{ parseInt(item.value) }}</view>
					<view class="font-size-sm font-weight-light">元</view>
				</view>
			</view>
			
			<template v-if="rechargeCard">
				<view class="font-size-lg text-color-base font-weight-bold" style="margin-bottom: 20rpx;">使用说明</view>
				<view class="pre-line font-size-sm text-color-assist">
					{{ rechargeCard.desc }}
				</view>
			</template>
			
			<!-- bottom box begin -->
			<view class="bottom-box position-fixed fixed-bottom w-100 d-flex flex-column bg-white">
				<view class="protocol font-size-sm d-flex justify-content-start align-items-center">
					<view class="iconfont line-height-100"  @tap="agree = !agree"
						:class="{'iconradio-button-on text-color-primary': agree, 'iconradio-button-off text-color-base': !agree}"></view>
					<view class="text-color-base">我已阅读并同意</view>
					<view class="text-color-primary">《储值协议》</view>
				</view>
				<button type="primary" class="b">购买</button>
			</view>
			<!-- bottom box end -->
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				agree: false,
				amounts: []
			}
		},
		async onLoad() {
			this.amounts = await this.$api('rechargeCards')
		},
		computed: {
			rechargeCard() {
				return this.amounts.find(item => item.selected) || ''
			}
		},
		methods: {
			handleSelected(index) {
				this.amounts.forEach(item => this.$set(item, 'selected', false))
				this.$set(this.amounts[index], 'selected', true)
			}
		}
	}
</script>

<style lang="scss" scoped>
.container {
	padding: 0 40rpx;
}

.balance-info {
	padding: 50rpx 10rpx;
	
	view {
		height: calc(366 / 638 * 340);
		padding: 10rpx 0;
	}
	image {
		width: 340rpx;
	}
}

.amounts {
	margin-bottom: 40rpx;
	
	.amount {
		width: calc(96% / 3);
		padding: 50rpx 0;
		margin-bottom: 20rpx;
		border-radius: 8rpx;
	}
}

.bottom-box {
	padding: 0 40rpx;
	box-shadow: 0 0 20rpx rgba(6, 6, 6, 0.1);
	
	.protocol {
		padding: 36rpx 0;
		height: 100rpx;
		view {
			margin-right: 10rpx;
		}
	}
	
	button {
		height: 70rpx;
		line-height: 70rpx;
		border-radius: 50rem !important;
		margin-bottom: 30rpx;
	}
}
</style>
