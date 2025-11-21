# Yêu cầu: Xây dựng Frontend Hiện đại cho Dự án Bookstore (2025)

## 1. Vai trò
Bạn là một Senior Frontend Engineer và UI/UX Designer chuyên nghiệp. Nhiệm vụ của bạn là xây dựng một ứng dụng web frontend hoàn chỉnh cho hệ thống bán sách (Bookstore), sử dụng các công nghệ mới nhất của năm 2025.

## 2. Tech Stack & Công cụ
- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (với cấu hình màu sắc hiện đại, hỗ trợ Dark Mode)
- **UI Library**: Shadcn/UI (hoặc Radix UI + Tailwind) để đảm bảo tính nhất quán và đẹp mắt.
- **Icons**: Lucide React
- **State Management**: Zustand (cho Global Store: Cart, Auth)
- **Data Fetching**: TanStack Query (React Query) v5
- **HTTP Client**: Axios (đã cấu hình Interceptors để xử lý JWT Token)
- **Forms**: React Hook Form + Zod (validation)

## 3. Phong cách thiết kế (Design System 2025)

### 3.1. Triết lý thiết kế (Design Philosophy)
-   **Minimalism & Clean**: Tập trung vào nội dung (Content-first). Loại bỏ các chi tiết thừa thãi.
-   **Consistency**: Đảm bảo tính nhất quán về màu sắc, typography, spacing và component trên toàn bộ ứng dụng.
-   **Accessibility (a11y)**: Đảm bảo độ tương phản màu sắc, hỗ trợ keyboard navigation và screen readers.

### 3.2. Typography
-   **Font Family**: Sử dụng `Inter` hoặc `Plus Jakarta Sans` cho body text để tối ưu khả năng đọc. Sử dụng `Outfit` hoặc `Clash Display` cho Headings để tạo điểm nhấn hiện đại.
-   **Hierarchy**:
    -   H1: Bold, 32px-48px (Mobile/Desktop).
    -   H2: SemiBold, 24px-32px.
    -   Body: Regular, 14px-16px.
    -   Small/Caption: Medium, 12px.

### 3.3. Color Palette (Tailwind Config)
-   **Primary (Brand Color)**:
    -   Light: `Indigo-600` (#4F46E5) hoặc `Violet-600` (#7C3AED).
    -   Dark: `Indigo-500` (#6366F1).
-   **Secondary (Accent)**:
    -   `Emerald-500` (#10B981) cho các hành động tích cực (Success, Buy Now).
    -   `Rose-500` (#F43F5E) cho các hành động tiêu cực (Delete, Error).
    -   `Amber-500` (#F59E0B) cho cảnh báo hoặc đánh giá (Stars).
-   **Neutral (Background & Text)**:
    -   Light Mode: Background `Slate-50` (#F8FAFC), Surface `White` (#FFFFFF), Text `Slate-900` (#0F172A).
    -   Dark Mode: Background `Slate-950` (#020617), Surface `Slate-900` (#0F172A), Text `Slate-50` (#F8FAFC).

### 3.4. Spacing & Layout
-   **Grid System**: Sử dụng 8pt grid system (spacing-2 = 8px, spacing-4 = 16px, ...).
-   **Container**:
    -   Mobile: 100% width, padding-x 16px.
    -   Desktop: Max-width 1280px, centered.
-   **Border Radius**:
    -   Small: `rounded-md` (6px) cho inputs, buttons nhỏ.
    -   Medium: `rounded-lg` (8px) cho cards, modals.
    -   Large: `rounded-xl` (12px) hoặc `rounded-2xl` (16px) cho container lớn.

### 3.5. Component Styling
-   **Buttons**:
    -   *Primary*: Background Primary, Text White, Shadow-sm, Hover: Opacity-90.
    -   *Secondary/Outline*: Border Primary, Text Primary, Hover: Bg-Primary-50.
    -   *Ghost*: Transparent, Text Slate-700, Hover: Bg-Slate-100.
    -   *Destructive*: Background Rose-600, Text White.
-   **Cards (Product/Book)**:
    -   Background White (Dark: Slate-900).
    -   Border: 1px solid Slate-200 (Dark: Slate-800).
    -   Shadow: `shadow-sm`, Hover: `shadow-md` + `translate-y-[-2px]` (transition-all duration-300).
-   **Inputs**:
    -   Border Slate-300, Focus: Ring-2 Ring-Primary-500 Ring-Offset-2.
    -   Error State: Border Rose-500, Ring-Rose-500.

### 3.6. Visual Effects
-   **Glassmorphism**: Sử dụng cho Navbar sticky và Modal overlays.
    -   Class: `bg-white/70 backdrop-blur-md border-b border-white/20` (Dark: `bg-slate-950/70`).
-   **Gradients**: Sử dụng tinh tế cho background của Hero section hoặc Primary Buttons để tạo chiều sâu.
    -   Ví dụ: `bg-gradient-to-r from-indigo-500 to-purple-500`.

## 4. Định nghĩa TypeScript & Cấu trúc Dữ liệu (Quan trọng)

Dưới đây là các định nghĩa chính xác cần sử dụng trong Frontend để khớp với Backend:

### 4.1. API Response Wrapper
Mọi response từ API đều tuân theo cấu trúc này:
```typescript
export interface ApiResponseMeta {
  timestamp: string;
  requestId: string;
  [key: string]: unknown;
}

export type ApiErrorPayload = Record<string, string[]> | string[] | string | null;

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T; // Có thể là null nếu lỗi
  errors?: ApiErrorPayload;
  meta?: ApiResponseMeta;
}
```

### 4.2. Enums
```typescript
export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}
```

### 4.3. Core Entities
```typescript
export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  phone?: string | null;
  address?: string | null;
  position?: string | null;
  role: Role;
  createdAt: string; // ISO Date string
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  parentCategoryId?: string | null;
  _count?: {
    books: number;
  };
}

export interface Author {
  id: string;
  name: string;
  bio?: string;
  _count?: {
    books: number;
  };
}

export interface Publisher {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  _count?: {
    books: number;
  };
}

export interface Book {
  id: string;
  title: string;
  price: number;
  stock: number;
  description?: string | null;
  imageUrl?: string | null;
  publisherId: string;
  categoryId: string;
  category: Category;
  publisher: Publisher;
  authors: Author[];
  ratings?: Rating[];
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  cartId: string;
  bookId: string;
  quantity: number;
  book: Book;
}

export interface Cart {
  id: string;
  userId: string;
  total: number;
  items: CartItem[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  bookId: string;
  quantity: number;
  price: number; // Giá tại thời điểm mua
  book: Book;
}

export interface Order {
  id: string;
  userId: string;
  total: number;
  status: OrderStatus;
  isPaid: boolean; // Lưu ý: Backend có thể trả về field này trong data response dù schema không có trực tiếp (được tính toán hoặc từ bảng Payment)
  shippingAddress: string;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface Rating {
  id: string;
  userId: string;
  bookId: string;
  stars: number;
  content?: string | null;
  user?: User; // Thường được include khi lấy list rating
  createdAt: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
}
```

### 4.4. Auth DTOs
```typescript
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  address?: string;
  position?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
```

## 5. Các Chức năng & Màn hình (Pages)

### A. Public Pages (Người dùng vãng lai)
1.  **Trang chủ (Home Page)**:
    -   Hero Section: Banner lớn, nút "Mua ngay".
    -   Featured Books: Slider hoặc Grid hiển thị sách nổi bật.
    -   Categories: Danh sách các danh mục sách.
2.  **Danh sách Sách (Books Page)**:
    -   Grid hiển thị sách với hình ảnh, tên, giá, tác giả.
    -   **Filter/Sort**: Tìm kiếm theo tên (`search`), lọc theo `categoryId`, `authorId`, `publisherId`.
    -   Pagination: Phân trang (nếu API hỗ trợ) hoặc Infinite Scroll.
3.  **Chi tiết Sách (Book Detail Page)**:
    -   Thông tin chi tiết: Ảnh lớn, Tên, Giá, Tác giả, Nhà xuất bản, Mô tả, Tồn kho (Stock).
    -   **Action**: Nút "Thêm vào giỏ" (Add to Cart) - disable nếu `stock === 0`.
    -   **Ratings & Reviews**: Hiển thị danh sách đánh giá và form gửi đánh giá (nếu đã login).

### B. Authentication (Xác thực)
1.  **Login**: Form đăng nhập (Email/Password). Lưu Token vào LocalStorage/Cookie.
2.  **Register**: Form đăng ký đầy đủ.

### C. User Pages (Yêu cầu đăng nhập)
1.  **Giỏ hàng (Cart)**:
    -   Gọi API `GET /api/cart`.
    -   Hiển thị danh sách item, số lượng, đơn giá.
    -   Cho phép tăng/giảm số lượng (`PATCH /api/cart/items/:itemId`), xóa item (`DELETE`).
    -   Hiển thị Tổng tiền tạm tính.
2.  **Thanh toán (Checkout)**:
    -   Nhập địa chỉ giao hàng (Shipping Address).
    -   Chọn phương thức thanh toán (`GET /api/payment-methods`).
    -   Nút "Đặt hàng" (`POST /api/orders`).
3.  **Hồ sơ cá nhân (Profile)**:
    -   Xem và cập nhật thông tin cá nhân (`GET/PUT /api/auth/profile`).
    -   **Lịch sử đơn hàng (My Orders)**: Danh sách đơn hàng đã đặt (`GET /api/orders`), trạng thái hiện tại.

### D. Admin Dashboard (Yêu cầu Role ADMIN)
1.  **Dashboard Overview**: Thống kê cơ bản.
2.  **Quản lý Sách (Books Management)**:
    -   Bảng danh sách sách (Table).
    -   Chức năng: Thêm mới, Sửa, Xóa sách.
3.  **Quản lý Danh mục/Tác giả/NXB**: CRUD cơ bản.
4.  **Quản lý Đơn hàng (Order Management)**:
    -   Xem danh sách tất cả đơn hàng (`GET /api/orders/all`).
    -   Cập nhật trạng thái đơn hàng (`PATCH /api/orders/:id/status`).
    -   Xác nhận thanh toán (`PATCH /api/orders/:id/confirm`).

## 6. API Integration Requirements
Kết nối với Backend tại `http://localhost:3000`.
-   Sử dụng `axios` instance với interceptor để tự động đính kèm `Authorization: Bearer {token}` cho các request cần thiết.
-   Xử lý `401 Unauthorized`: Tự động logout hoặc redirect về trang login.

## 7. Yêu cầu đặc biệt
-   **Validation**: Sử dụng Zod schema khớp với các rule của backend (ví dụ: password min 6 chars).
-   **Error Handling**: Hiển thị thông báo lỗi từ `response.data.message` hoặc `response.data.errors`.
-   **Loading State**: Sử dụng Skeleton Loading khi đang tải dữ liệu.
-   **Code Structure**:
    -   `components/ui`: Các component cơ bản (Button, Input, etc.)
    -   `components/features`: Các component theo tính năng (BookCard, CartItem...)
    -   `lib/api`: Các hàm gọi API.
    -   `lib/types`: File định nghĩa type (copy từ mục 4).
    -   `hooks`: Custom hooks (useCart, useAuth...).