<template>
	<view class="container position-relative">
		<view style="padding-bottom: 150rpx;">
			<view class="d-flex flex-column" v-if="pointGood.goods_type == 2">
				<view class="bg-white mb-30">
					<image :src="pointGood.img[0]" class="w-100" mode="widthFix"></image>
					<view class="d-flex flex-column" style="padding: 30rpx;">
						<view class="d-flex align-items-center mb-10">
							<view class="d-flex align-items-baseline">
								<view class="font-size-extra-lg text-color-primary mr-10 font-weight-bold">{{ pointGood.points_price }}</view>
								<view class="font-size-base text-color-base">积分</view>
							</view>
							<view v-if="pointGood.amount > 0" class="font-size-sm text-color-base" style="margin: 0 10rpx;">+</view>
							<view class="d-flex align-items-baseline" v-if="pointGood.amount > 0">
								<view class="font-size-extra-lg text-color-primary mr-10 font-weight-bold">{{ pointGood.amount }}</view>
								<view class="font-size-base text-color-base">元</view>
							</view>
						</view>
						<view class="d-flex justify-content-between align-items-center">
							<view class="font-size-extra-lg text-color-base font-weight-bold">
								{{ pointGood.goods_name }}
							</view>
							<view class="font-size-sm text-color-base">
								剩余<text class="text-color-primary">{{ pointGood.goods_stock }}</text>件
							</view>
						</view>
					</view>
				</view>
				<view class="bg-white mb-20" style="padding: 30rpx;">
					<view class="d-flex align-items-center font-size-lg font-weight-bold line-height-2">商品详情</view>
					<view class="font-size-base text-color-assist">
						<jyf-parser ref="desc"></jyf-parser>
					</view>
				</view>
			</view>
			<template v-else>
				<view class="coupon-box">
					<view class="coupon">
						<image src="/static/images/integrals/ticket.png" mode="center"></image>
						<view class="intro">
							<view class="goods-name">{{ pointGood.goods_name }}</view>
							<view class="expire">有效期：领券当日开始90天内有效</view>
						</view>
					</view>
				</view>
				<view class="points-and-stocks">
					<view class="points">
						<view class="font-size-lg text-color-primary font-weight-bold mr-10">{{ pointGood.points_price }}</view>
						<view class="font-size-sm text-color-base">积分</view>
					</view>
					<view class="stocks font-size-sm text-color-base">
						剩余<text class="text-color-primary">{{ pointGood.goods_stock }}</text>件
					</view>
				</view>
				<view class="w-100 bg-white" style="padding: 30rpx;">
					<view class="d-flex align-items-center font-size-lg font-weight-bold line-height-2">兑换须知</view>
					<view class="font-size-base text-color-assist">
						<jyf-parser ref="desc"></jyf-parser>
					</view>
					<view class="d-flex align-items-center font-size-lg font-weight-bold line-height-2">使用须知</view>
					<view class="font-size-base text-color-base line-height-2 d-flex align-items-center" v-for="(item, index) in useTips" :key="index">
						<view>{{ item.title }}：</view>
						<view class="font-weight-bold">{{ item.value }}</view>
					</view>
				</view>
			</template>
			
			<view class="btn-box">
				<button type="primary" :disabled="customPoints.totalPoints < pointGood.points_price">
					{{ customPoints.totalPoints < pointGood.points_price ? '积分不足' : '立即兑换' }}
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	import jyfParser from '@/components/jyf-parser/jyf-parser'
	import pointsMall from '@/api/points-mall'
	
	export default {
		components: {
			jyfParser
		},
		data() {
			return {
				customPoints: {},
				pointGood: {},
				useTips: [
					{title: '使用条件', value: '无门槛'},
					{title: '优惠形式', value: '免最高1件'},
					{title: '有效期', value: '领券当日开始90天内有效'},
					{title: '使用时段', value: '00:00:00~23:59:59'},
					{title: '使用限制', value: '不限制'},
					{title: '兑换限制', value: '不限制'},
					{title: '活动商品', value: '限部分商品'},
					{title: '是否与其他优惠共享', value: '否'},
					{title: '使用场景', value: '仅外卖、堂食可用'},
				]
			}
		},
		async onLoad({cate, id}) {
			this.pointGood = pointsMall[cate].find(item => item.id == id)
			this.$nextTick(() => this.$refs['desc'].setContent(this.pointGood.exchange_desc || ''))
			this.customPoints = await this.$api('customPoints')
		}
	}
</script>

<style lang="scss" scoped>
	.btn-box {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 150rpx;
		padding: 30rpx;
		z-index: 10;
		background-color: #FFFFFF;
		box-shadow: 0 0 20rpx rgba($color: #000000, $alpha: 0.1);
		
		button {
			border-radius: 50rem !important;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	
	.coupon-box {
		width: 100%;
		padding: 30rpx 50rpx;
		
		.coupon {
			background-color: #FFFFFF;
			padding: 40rpx;
			border-radius: 10rpx;
			display: flex;
			align-items: center;
			position: relative;
			
			image {
				width: 180rpx;
				height: 120rpx;
				margin-right: 30rpx;
			}
			
			.intro {
				flex: 1;
				display: flex;
				flex-direction: column;
				
				.goods-name {
					font-size: $font-size-lg;
					color: $text-color-base;
					margin-bottom: 10rpx;
				}
				
				.expire {
					font-size: 22rpx;
					color: $text-color-assist;
				}
			}
			
			@mixin arch {
				content: " ";
				position: absolute;
				background-color: $bg-color;
				width: 40rpx;
				height: 40rpx;
				z-index: 10;
				border-radius: 100%;
			}
			
			&::before {
				@include arch;
				left: -20rpx;
			}
			
			&::after {
				@include arch;
				right: -20rpx;
			}
		}
	}
	
	.points-and-stocks {
		padding: 0 50rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30rpx;
		
		.points {
			display: flex;
			align-items: baseline;
		}
	}
</style>
