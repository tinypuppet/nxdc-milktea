<template>
	<view class="container">
		<!-- <image src="https://img-shop.qmimg.cn/s16/images/2020/04/27/7ba54456f16f48df.jpeg"></image> -->
<!-- 		<image src="https://img-shop.qmimg.cn/s16/images/2020/04/27/ca59f6bbbb830a16.png"></image>
		<image src="https://img-shop.qmimg.cn/s16/images/2020/04/22/36d4a67a6ede4068.png"></image>
		<image src="https://img-shop.qmimg.cn/s16/images/2020/04/21/7a7cde7fb0259f0d.png"></image>
		<image src="https://img-shop.qmimg.cn//s16/images/2020/04/21/a45e8244188a5ea0.png"></image> -->
		<view class="invite-box">
			<view class="w-100 d-flex justify-content-end align-items-baseline font-size-sm">
				<view class="text-color-danger font-size-lg">0</view>
				<view class="text-color-assist">/3</view>
			</view>
			<view class="progress-box">
				<progress :percent="1/3 * 100" backgroundColor="#FEEBD5" activeColor="#FEDC5F" stroke-width="30" border-radius="30"></progress>
			</view>
			<view class="d-flex flex-column text-color-danger font-size-sm align-items-center mb-40">
				<view>每邀3位新用户点亮，得买茶送包劵1张</view>
				<view>新用户可得30元权益劵包</view>
			</view>
			<view class="d-flex just-content-center" style="opacity: 0.8;" hover-class="opacity-1">
				<view class="w-90 position-relative">
					<image src="https://img-shop.qmimg.cn//s16/images/2020/04/21/a45e8244188a5ea0.png" class="w-100" mode="widthFix"></image>
				</view>
				<view class="font-size-lg text-color-danger position-absolute d-flex align-items-center mt-30">
					<view>立即找好友助力</view>
					<image class="to-invite-img" src="https://img-shop.qmimg.cn/s16/images/2020/04/22/36d4a67a6ede4068.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
		
		<view class="my-award">
			<image src="https://img-shop.qmimg.cn/s16/images/2020/04/21/7a7cde7fb0259f0d.png" class="my-award-img" mode="widthFix"></image>
			<view class="item">
				<view class="font-size-lg text-color-danger">0</view>
				<view class="font-size-sm text-color-assist">已成功邀请(位)</view>
			</view>
			<view class="item">
				<view class="font-size-lg text-color-danger">0</view>
				<view class="font-size-sm text-color-assist">已获得奖励(次)</view>
			</view>
		</view>
		
		<image src='https://img-shop.qmimg.cn/s16/images/2020/04/27/ca59f6bbbb830a16.png' class="w-100 firend-award" mode="widthFix"></image>
		
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

<style lang="scss">
page {
	background: url('https://img-shop.qmimg.cn/s16/images/2020/04/27/7ba54456f16f48df.jpeg') no-repeat;
	background-size: 100% auto;
	padding: 576rpx 30rpx 0;
	height: auto;
}
.invite-box {
	padding: 40rpx 70rpx;
	background-color: #FFFFFF;
	border-radius: 8rpx;
	display: flex;
	flex-direction: column;
	position: relative;
	margin-bottom: 30rpx;
}

.progress-box {
	width: 100%;
	margin: 20rpx 0;
}

.to-invite-img {
	width: 16rpx;
	margin-left: 10rpx;
}

.opacity-1 {
	opacity: 1 !important;
}

.my-award {
	padding: 60rpx 0;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #FFFFFF;
	border-radius: 8rpx;
	margin-bottom: 30rpx;
	position: relative;
	
	.my-award-img {
		width: 291rpx;
		position: absolute;
		top: -15rpx;
	}
	
	.item {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
		
		&::after {
			position: absolute;
			content: ' ';
			background-color: #ccc;
			width: 2rpx;
			height: 100%;
			right: 0;
			top: 0;
			transform: scaleY(0.5);
		}
		
		&:nth-last-child(1) {
			&::after {
				width: 0;
			}
		}
	}
}
</style>
