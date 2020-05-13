<template>
	<view class="position-absolute" :style="{zIndex: 99,height: height + 'px', top: top + 'px', left: left + 'px'}" @tap="click">
		<image src="/static/images/back.png" :style="{height: height + 'px', width: height + 'px'}"></image>
	</view>
</template>

<script>
	export default {
		name: "navbarBackButton",
		data() {
			return {
				height: 0,
				left: 0,
				top: 0
			}
		},
		created() {
			//#ifdef MP-WEIXIN
			const {height, right, top} = uni.getMenuButtonBoundingClientRect()
			const {windowWidth} = uni.getSystemInfoSync()
			this.top = top
			this.left = windowWidth - right
			this.height = height
			//#endif
			//#ifndef MP-WEIXIN
			this.height = 32
			this.top = 26
			this.left = 10
			//#endif

		},
		methods: {
			click() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
