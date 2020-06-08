<template>
	<view class="container">
		<view class="tabbar">
			<view class="item" :class="{'active': !currentTab}" @tap="switchTab(0)">购买礼品卡</view>
			<view class="item" :class="{'active': currentTab}" @tap="switchTab(1)">我的礼品卡</view>
		</view>
		<swiper :duration="400" :disable-touch="true" class="flex-fill" :current="currentTab">
			<!-- 购买礼品卡 begin -->
			<swiper-item class="swiper-item-1">
				<scroll-view scroll-y="true" class="h-100" style="padding-bottom: 80rpx;">
					<image :src="giftCards.img" class="w-100" mode="widthFix"/>
					<view class="pl-20 pr-20 mb-30">
						<view class="category-list mt-40" v-for="(category, index) in giftCards.category_list" :key="index">
							<view class="font-size-lg font-weight-bold">{{ category.name }}</view>
							<view class="themes-list">
								<view class="theme" v-for="(theme, key) in category.themesList" :key="key">
									<image :src="theme.imageUrls" class="w-100" mode="widthFix"/>
									<view class="activity-name">{{ theme.activityName }}</view>
								</view>
							</view>
						</view>
					</view>
					<view class="footer">
						<view>购买须知</view>
						<view class="divider"></view>
						<view>礼品卡章程</view>
					</view>
				</scroll-view>
			</swiper-item>
			<!-- 购买礼品卡 end -->
			<!-- 我的礼品卡 begin -->
			<swiper-item class="swiper-item-2">
				<view class="header"></view>
				<swiper :duration="400">
					<swiper-item>
					</swiper-item>
					<swiper-item>
					</swiper-item>
				</swiper>
				<view class="footer">
					<button type="primary" plain>获取记录</button>
					<button type="primary">赠送记录</button>
				</view>
			</swiper-item>
			<!-- 我的礼品卡 end -->
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				giftCards: {},
				currentTab: 0
			}
		},
		async onShow() {
			this.giftCards = await this.$api('giftCards')
		},
		methods: {
			switchTab(index) {
				this.currentTab = index
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		display: flex;
		flex-direction: column;
	}
	
	.tabbar {
		border-top: 1rpx solid $border-color;
		background-color: $text-color-white;
		height: 100rpx;
		width: 100%;
		display: flex;
		align-items: stretch;
		font-size: $font-size-lg;
		
		.item {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			
			&.active {
				color: $color-primary;
				
				&:after {
					content: '';
					position: absolute;
					width: 40rpx;
					height: 10rpx;
					background-color: $color-primary;
					border-radius: 50rem !important;
					bottom: 0;
				}
			}
		}
	}

	.swiper-item-1 {
		height: 100%;
		
		.themes-list {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			
			.theme {
				width: 340rpx;
				margin-top: 30rpx;
				border-radius: 24rpx;
				background-color: $text-color-white;
				display: flex;
				flex-direction: column;
				box-shadow: $box-shadow;
				
				image {
					border-radius: 24rpx 24rpx 0 0;
					max-height: 300rpx;
				}
			}
			
			.activity-name {
				font-size: $font-size-base;
				padding: 20rpx 0;
				text-align: center;
			}
		}
		
		.footer {
			background-color: $bg-color;
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 80rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: $font-size-sm;
			color: $color-primary;
			
			.divider {
				height: 0.6rem;
				width: 4rpx;
				background-color: $color-primary;
				margin: 0 20rpx;
			}
		}
	}
	
	.swiper-item-2 {
		height: 100%;
		
		.footer {
			background-color: $text-color-white;
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 120rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10rpx 40rpx;
			box-shadow: 0 -10rpx 10rpx rgba($color: #eee, $alpha: 0.1);
			
			button {
				width: 310rpx;
				height: 100%;
				line-height: 100rpx;
				border-radius: 50rem !important;
				font-size: $font-size-lg;
			}
		}
	}
</style>
