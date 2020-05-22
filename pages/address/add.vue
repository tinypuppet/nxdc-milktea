<template>
	<view class="container">
		<view class="form-box">
			<view class="form">
				<list-cell :hover="false">
					<view class="form-input">
						<view class="label">收货人</view>
						 <input class="input" placeholder="请输入收货人" v-model="form.accept_name" placeholder-class="text-color-assist"/>
					</view>
				</list-cell>
				<list-cell :hover="false">
					<view class="form-input">
						<view class="label">性别</view>
						<view class="radio-group">
							<view class="radio" :class="{'checked': !form.sex}" style="margin-right: 10rpx;" @tap="form.sex=0">先生</view>
							<view class="radio" :class="{'checked': form.sex}" @tap="form.sex=1">女士</view>
						</view>
					</view>
				</list-cell>
				<list-cell :hover="false">
					<view class="form-input">
						<view class="label">联系方式</view>
						 <input class="input" placeholder="请输入收货人联系方式" v-model="form.mobile" placeholder-class="text-color-assist"/>
					</view>
				</list-cell>
				<list-cell :hover="false">
					<view class="form-input">
						<view class="label">收货地址</view>
						 <input class="input" placeholder="请选择收货地址" v-model="form.street" placeholder-class="text-color-assist"/>
					</view>
				</list-cell>
				<list-cell :hover="false">
					<view class="form-input">
						<view class="label">门牌号</view>
						 <input class="input" placeholder="请输入收货人详细地址" v-model="form.door_number" placeholder-class="text-color-assist"/>
					</view>
				</list-cell>
			</view>
			<view class="btn-section">
				<button type="primary" size="default" @tap="save">保存</button>
			</view>
		</view>
	</view>
</template>

<script>
	import listCell from '@/components/list-cell/list-cell'
	
	export default {
		components: {
			listCell
		},
		data() {
			return {
				form: {
					accept_name: '',
					sex: 0,
					mobile: '',
					street: '',
					door_number: ''
				}
			}
		},
		async onLoad({id}) {
			//为了方便演示，这里用本地缓存
			if(id) {
				this.form = this.$store.state.addresses.find(item => item.id == id)
			}
		},
		methods: {
			save() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.form-box {
		width: 100%;
		height: 100%;
		padding: 30rpx;
		display: flex;
		flex-direction: column;
		color: $text-color-base;
		
		.form-input {
			display: flex;
			align-items: center;
			width: 100%;
		}
		
		.label {
			width: 200rpx;
			font-size: $font-size-lg;
			color: $text-color-base;
			font-weight: 500;
		}
		
		.input {
			flex: 1;
			display: flex;
			align-items: center;
		}
		
		.radio-group {
			display: flex;
			justify-content: flex-start;
			
			.radio {
				padding: 10rpx 30rpx;
				border-radius: 6rpx;
				border: 2rpx solid $text-color-assist;
				color: $text-color-assist;
				font-size: $font-size-base;
				
				&.checked {
					background-color: $color-primary;
					color: $text-color-white;
					border: 2rpx solid $color-primary;
				}
			}
		}
		
		.btn-section {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			
			button {
				font-size: $font-size-base;
				height: 90rpx;
				border-radius: 50rem !important;
				width: 85%;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
</style>
