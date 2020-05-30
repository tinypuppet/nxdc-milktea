<template>
	<view class="container">
		<view class="cell">
			<view class="content">
				<image src="/static/images/services/djsm.png" class="icon"></image>
				<view>等级说明</view>
			</view>
			<image src="/static/images/navigator-1.png" class="navigator"></image>
		</view>
		<view class="cell">
			<view class="content">
				<image src="/static/images/services/hyxy.png" class="icon"></image>
				<view>会员协议</view>
			</view>
			<image src="/static/images/navigator-1.png" class="navigator"></image>			
		</view>
		<view class="cell">
			<view class="content">
				<image src="/static/images/services/ystk.png" class="icon"></image>
				<view>隐私条款</view>
			</view>
			<image src="/static/images/navigator-1.png" class="navigator"></image>			
		</view>
		<view class="cell">
			<view class="content">
				<image src="/static/images/services/cjwt.png" class="icon"></image>
				<view>常见问题</view>
			</view>
			<image src="/static/images/navigator-1.png" class="navigator"></image>			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #FFFFFF;
	}
	
	.cell {
		padding: 30rpx;
		display: flex;
		align-items: center;
		position: relative;
		
		.content {
			flex: 1;
			display: flex;
			align-items: center;
			font-size: $font-size-base;
			color: $text-color-base;
			
			.icon {
				width: 70rpx;
				height: 70rpx;
				margin-right: 10rpx;
			}
		}
		
		.navigator {
			width: 50rpx;
			height: 50rpx;
			position: relative;
			margin-right: -10rpx;
			flex-shrink: 0;
		}
		
		&:after {
			content: '';
			position: absolute;
			border-bottom: 2rpx solid #d9d9d9;
			-webkit-transform: scaleY(0.8);
			transform: scaleY(0.8);
			bottom: 0;
			right: 30rpx;
			left: 30rpx;
		}
	}
</style>
