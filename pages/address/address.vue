<template>
	<view class="container">
		<view class="main">
			<view v-if="!addresses.length" class="no-address-tips">
				<view class="mb-30">暂无地址信息</view>
				<view>请点击底部按钮添加地址信息</view>
			</view>
			<template v-else>
				<uni-swipe-action>
					<uni-swipe-action-item class="address-wrapper" :options="swipeOption" @click="handleSwipeClick(address.id)" v-for="(address, index) in addresses" :key="index">
						<view class="address" @tap="chooseAddress(address)">
							<view class="left flex-fill overflow-hidden mr-20">
								<view class="font-size-lg font-weight-bold text-truncate" style="margin-bottom: 10rpx;">{{ address.street }}</view>
								<view class="font-size-sm text-color-assist">
									{{ address.accept_name }} {{ !address.gender ? '先生' : '女士' }} {{ address.mobile }}
								</view>
							</view>
							<image src="/static/images/edit.png" class="edit-icon" @tap.stop="edit(address.id)"></image>
						</view>
					</uni-swipe-action-item>
				</uni-swipe-action>
			</template>
		</view>
		<view class="btn-box">
			<button type="primary" size="default" @tap="add">新增地址</button>
		</view>
	</view>
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
	import uniSwipeAction from '../../components/uni-swipe-action/uni-swipe-action'
	import uniSwipeActionItem from '../../components/uni-swipe-action-item/uni-swipe-action-item'
	
	export default {
		components: {
			uniSwipeAction,
			uniSwipeActionItem
		},
		data() {
			return {
				scene: 'menu',
				is_choose: false, //是否选择地址
				swipeOption: [
					{
						text: '删除',
						style: {
							backgroundColor: '#D12E32'
						}
					}
				]
			}
		},
		computed: {
			...mapState(['addresses'])
		},
		async onLoad({is_choose, scene}) {
			this.is_choose = is_choose || false
			this.scene = scene || 'menu'
		},
		methods: {
			...mapMutations(['SET_ADDRESS', 'SET_ADDRESSES', 'SET_ORDER_TYPE']),
			add() {
				uni.navigateTo({
					url: '/pages/address/add'
				})
			},
			edit(id) {
				uni.navigateTo({
					url: '/pages/address/add?id=' + id
				})
			},
			handleSwipeClick(id) {
				uni.showModal({
					title: '提示',
					content: '确定要删除？',
					success: res => {
						if(res.confirm) {
							const index = this.addresses.findIndex(item => item.id == id)
							const addresses = JSON.parse(JSON.stringify(this.addresses))
							addresses.splice(index, 1)
							this.SET_ADDRESSES(addresses)
							uni.showToast({title: '删除成功！', icon: 'success'})
						}
					}
				})
			},
			chooseAddress(address) {
				if(!this.is_choose) return
				this.SET_ADDRESS(address)
				this.SET_ORDER_TYPE('takeout')
				if(this.scene == 'menu') {
					uni.switchTab({
						url: '/pages/menu/menu'
					})
				} else if(this.scene == 'pay') {
					uni.navigateTo({
						url: '/pages/pay/pay'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		height: 100%;
	}
	
	.main {
		width: 100%;
		padding: 30rpx;
		display: flex;
		flex-direction: column;
		padding-bottom: 100rpx;
		
		.address-wrapper {
			margin-bottom: 30rpx;
		}
		
		.address {
			width: 100%;
			padding: 40rpx 30rpx;
			background-color: #FFFFFF;
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			.right {
				flex: 1;
				overflow: hidden;
				display: flex;
				flex-direction: column;
			}
			
			.edit-icon {
				width: 50rpx;
				height: 50rpx;
				flex-shrink: 0;
			}
		}
	}
	
	.btn-box {
		height: 100rpx;
		background-color: #FFFFFF;
		box-shadow: 0 0 20rpx rgba($color: $text-color-assist, $alpha: 0.1);
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 10rpx 0;
		display: flex;
		align-items: center;
		justify-content: center;
		
		button {
			height: 80rpx;
			width: 80%;
			border-radius: 50rem !important;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
