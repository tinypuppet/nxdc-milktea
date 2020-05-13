<template>
	<view class="loading">
		<image src="/static/images/loading.gif"></image>
	</view>
</template>

<script>
	export default {
		name: 'Loading',
		data() {
			return {
				
			}
		}
	}
</script>

<style lang="scss">
	.loading {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		image {
			width: 260rpx;
			height: 260rpx;
			position: relative;
			margin-top: 200rpx;
		}
	}
</style>
