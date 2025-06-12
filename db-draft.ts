enum ProductMVType {
	storehouse,
	selling,
	purchase,
	transfer,
}

enum InventoryStatus {
	new,
	cancelled,
	accepted,
}

enum OrderProductType {
	standart,
	nonstandart,
}

enum ProductDirection {
	right,
	left,
	none,
}

enum OrderProductStatus {
	new,
	accepted,
	cancelled,
	sold,
	loaded,
	received,
}

enum StorehouseType {
	warehouse,
	showroom,
}

interface PublicId {
	id: string
}

interface Storehouse {
	name: string
	type: StorehouseType
}

interface ProductStatusMV {
	status: string
	quantity: number
	productMVId: string
}

interface ProductStatusBooking {
	quantity: number
	productStatusMvId: string
	staffId: string
}

interface ProductMV {
	type: ProductMVType
	productId: string
	statuses: ProductStatusMV[]

	sellingId?: string
	purchaseId?: string
	transferId?: string
	storehouseId?: string
}

interface Selling {
	fromStorekeeperId: string
	fromStorehouseId: string
	status: InventoryStatus

	products: ProductMV[]
}

interface Purchase {
	providerId: string
	toWarehouseId: string
	toStorekeeperId: string
	status: InventoryStatus

	products: ProductMV[]
}

interface Transfer {
	toWarehouseId: string
	fromWarehouseId: string
	toStorekeeperId: string
	fromStorekeeperId: string
	status: InventoryStatus

	products: ProductMV[]
}
//=============
interface Product {
	publicId: string
	modelId: string
	tissue: string
	quantity: number
	direction: ProductDirection
	description: string
}

interface NonStandartProduct {
	publicId: string
	tissue: string
	direction: ProductDirection
	quantity: number
	modelId: string
	description: string
}

interface Cart {
	type: OrderProductType

	spsId?: string
	nspId?: string

	quantity: number
	totatSum: number
	sale: number
	price: number
	priceWithSale: number
	description: string

	staffId: string
}

interface OrderProduct {
	type: OrderProductType

	spsId?: string
	nspId?: string

	quantity: number
	totatSum: number
	sale: number
	price: number
	priceWithSale: number
	description: string

	status: OrderProductStatus

	staffId: string
}

enum ClientPurchaseStatus {
	first,
	next,
}

interface Order {
	clientId: string
	staffId: string
	deliveryDate: Date
	deliveryAddress: string
	clientPurchaseStatus: ClientPurchaseStatus

	products: OrderProduct[]
}

//======

enum PaymentMethod {
	cash_with_receipt, // Наличный с чеком
	cash_without_receipt, // Наличный без чека
	card_payme, // С карты PayMe
	card_uzum, // С карты Uzum
	card_anor, // С карты Anor
	card_solfy, // С карты Solfy
	card_zoodpay, // С карты ZoodPay
	card_to_card, // С карты на карту
	transfer, // Перечисление
	terminal, // Терминал
}

enum PaymentCurrency {
	uzs,
	usd,
}

interface Payment {
	sum: number
	method: PaymentMethod
	fromCurrency: PaymentCurrency
	exchangeRate: number
	toCurrency: PaymentCurrency
	totalSum: number
	description: string

	orderId: string
}

interface FurnitureType {
	name: string
}

interface Model {
	name: string
	providerId: string
	furnitureTypId: string
}

//=============

enum UserRoleName {
	client,
	provider,
	seller,
	storekeeper,
	admin,
}

interface User {
	phone: string
	fullname: string
	password: string
	refreshToken: string
	balance: number
	whereFrom: string
}

interface UserRole {
	userId: string
	role: UserRoleName
}

interface UserRoleAction {
	userRoleId: string
	actionId: string
}

enum ActionMethod {
	get,
	post,
	put,
	patch,
	delete,
}

interface Action {
	url: string
	name: string
	method: ActionMethod
	description: string

	userRoles: UserRole[]
	users: User[]
}
