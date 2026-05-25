"use client"

import { useState, useEffect } from "react"
import useSWR from "swr"
import { 
  ExternalLink, 
  FileText,
  LogIn,
  FolderOpen,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  Plus,
  X,
  Pencil,
  Trash2,
  Search,
  Upload,
  Download,
  Settings,
  ArrowUp,
  ArrowDown,
  Save,
  Heart,
  Send,
  MessageCircle,
  MessageSquare,
  Phone,
  Building2,
  User,
  Globe,
  Monitor,
  Headphones,
  Printer,
  ClipboardList,
  FileCheck,
  HelpCircle,
  Home as HomeIcon,
  MapPin,
  Megaphone,
  AlertTriangle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { FileUploadBox } from "@/components/file-upload-box"

// SWR fetcher
const fetcher = (url: string) => fetch(url).then(res => res.json())

// 예약 타입 정의 (DB 컬럼명 snake_case 매핑)
interface ReservationDB {
  id: number
  date: string
  time: string
  customer_name: string
  manager: string
  route: string
  memo: string
  created_at: string
}

interface Reservation {
  id: number
  date: string
  time: string
  customerName: string
  manager: string
  route: string
  memo: string
}

// 출퇴근 보고 타입 정의 (DB 컬럼명 snake_case 매핑)
interface AttendanceReportDB {
  id: number
  type: "출근" | "퇴근"
  jeong1: string
  jeong2: string
  daily_reservation: string
  daily_work: string
  gift_management: string
  created_at: string
  is_edited: boolean
}

interface AttendanceReport {
  id: number
  type: "출근" | "퇴근"
  jeong1: string
  jeong2: string
  dailyReservation: string
  dailyWork: string
  giftManagement: string
  createdAt: string
  isEdited: boolean
}

interface AttendanceLike {
  id: number
  report_id: number
  user_id: string
  created_at: string
}

interface AttendanceComment {
  id: number
  report_id: number
  nickname: string
  content: string
  user_id: string
  created_at: string
  updated_at: string
}

// DB -> 프론트엔드 타입 변환
const mapReservation = (r: ReservationDB): Reservation => ({
  id: r.id,
  date: r.date,
  time: r.time,
  customerName: r.customer_name,
  manager: r.manager,
  route: r.route,
  memo: r.memo
})

const mapAttendanceReport = (r: AttendanceReportDB): AttendanceReport => ({
  id: r.id,
  type: r.type,
  jeong1: r.jeong1,
  jeong2: r.jeong2,
  dailyReservation: r.daily_reservation,
  dailyWork: r.daily_work,
  giftManagement: r.gift_management,
  createdAt: r.created_at,
  isEdited: r.is_edited
})

// 자료실 타입 정의
interface ResourceDB {
  id: number
  title: string
  category: string
  description: string
  file_url: string
  file_name: string
  link_url: string
  created_at: string
  updated_at: string
}

interface Resource {
  id: number
  title: string
  category: string
  description: string
  fileUrl: string
  fileName: string
  linkUrl: string
  createdAt: string
}

const mapResource = (r: ResourceDB): Resource => ({
  id: r.id,
  title: r.title,
  category: r.category,
  description: r.description,
  fileUrl: r.file_url,
  fileName: r.file_name,
  linkUrl: r.link_url,
  createdAt: r.created_at
})

// 카테고리 타입
interface Category {
  id: number
  name: string
}

// 댓글 타입
interface Comment {
  id: number
  resource_id: number
  user_id: string
  nickname: string
  content: string
  created_at: string
}

// 공지사항 타입
interface NoticeDB {
  id: number
  title: string
  content: string
  author: string
  category: string
  is_edited: boolean
  created_at: string
  updated_at: string
}

interface Notice {
  id: number
  title: string
  content: string
  author: string
  category: string
  isEdited: boolean
  createdAt: string
}

interface NoticeLike {
  id: number
  notice_id: number
  user_id: string
  created_at: string
}

interface NoticeComment {
  id: number
  notice_id: number
  nickname: string
  content: string
  user_id: string
  created_at: string
  updated_at: string
}

const mapNotice = (n: NoticeDB): Notice => ({
  id: n.id,
  title: n.title,
  content: n.content,
  author: n.author,
  category: n.category,
  isEdited: n.is_edited,
  createdAt: n.created_at,
})

// 보험사 타입
interface InsuranceManager {
  id: number
  name: string
  phone: string
}

interface BranchManager {
  id: number
  name: string
  phone: string
  role: 'branch_manager' | 'assistant_branch_manager'
}

interface EducationManager {
  id: number
  name: string
  phone: string
}

interface InsuranceCompanyDB {
  id: number
  name: string
  category: string
  logo_url: string | null
  homepage_url: string | null
  customer_service: string | null
  fax: string | null
  address: string | null
  branch_manager_name: string | null
  branch_manager_phone: string | null
  computer_system_url: string | null
  incall_monitoring: string | null
  claim_fax: string | null
  claim_form_url: string | null
  terms_url: string | null
helpdesk: string | null
  dental_form_url: string | null
  memo: string | null
  updated_at: string | null
  managers: InsuranceManager[]
  branch_managers: BranchManager[]
  education_managers: EducationManager[]
  }
  
  interface InsuranceCompany {
  id: number
  name: string
  category: string
  logoUrl: string | null
  homepageUrl: string | null
  customerService: string | null
  fax: string | null
  address: string | null
  branchManagerName: string | null
  branchManagerPhone: string | null
  computerSystemUrl: string | null
  incallMonitoring: string | null
  claimFax: string | null
  claimFormUrl: string | null
  termsUrl: string | null
helpdesk: string | null
  dentalFormUrl: string | null
  memo: string | null
  updatedAt: string | null
  managers: InsuranceManager[]
  branchManagers: BranchManager[]
  educationManagers: EducationManager[]
  }

const mapInsuranceCompany = (c: InsuranceCompanyDB): InsuranceCompany => ({
  id: c.id,
  name: c.name,
  category: c.category,
  logoUrl: c.logo_url,
  homepageUrl: c.homepage_url,
  customerService: c.customer_service,
  fax: c.fax,
  address: c.address,
  branchManagerName: c.branch_manager_name,
  branchManagerPhone: c.branch_manager_phone,
  computerSystemUrl: c.computer_system_url,
  incallMonitoring: c.incall_monitoring,
  claimFax: c.claim_fax,
  claimFormUrl: c.claim_form_url,
  termsUrl: c.terms_url,
helpdesk: c.helpdesk,
  dentalFormUrl: c.dental_form_url,
  memo: c.memo,
  updatedAt: c.updated_at,
  managers: c.managers || [],
  branchManagers: c.branch_managers || [],
  educationManagers: c.education_managers || []
  })

// 메뉴 데이터 - 1줄: 메인 기능만
const menuItems = [
  {
    title: "출퇴근 보고",
    description: "",
    icon: LogIn,
    href: "#attendance",
    isAttendance: true
  },
  {
    title: "오류 보고",
    description: "",
    icon: AlertTriangle,
    href: "#error-report",
    isErrorReport: true
  },
  {
    title: "자료실",
    description: "",
    icon: FolderOpen,
    href: "#resources",
    isResources: true
  },
{
    title: "보험사 연락처",
    description: "",
    icon: Phone,
    href: "#insurance",
    isInsurance: true
  },
  {
    title: "원수사 연락망",
    description: "",
    icon: User,
    href: "#network",
    isNetwork: true
  },
  {
    title: "공지사항",
    description: "",
    icon: Megaphone,
    href: "#notices",
    isNotices: true
  },
  ]

export default function Home() {
  const [showCalendar, setShowCalendar] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 1)) // 2026년 5월
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [newReservation, setNewReservation] = useState({
    date: "",
    time: "",
    customerName: "",
    manager: "",
    route: "",
    memo: ""
  })
const [isSaving, setIsSaving] = useState(false)

  // 예약 리스트 관련 상태
  const [reservationSearch, setReservationSearch] = useState("")
  const [reservationSort, setReservationSort] = useState<"newest" | "upcoming">("newest")
  const [reservationModalMode, setReservationModalMode] = useState<"add" | "edit">("add")
  const [editingReservationId, setEditingReservationId] = useState<number | null>(null)
  const [showReservationDeleteConfirm, setShowReservationDeleteConfirm] = useState<number | null>(null)
  
  // 출퇴근 보고 관련 상태
  const [showAttendanceBoard, setShowAttendanceBoard] = useState(false)
  const [showAttendanceModal, setShowAttendanceModal] = useState(false)
  const [attendanceModalMode, setAttendanceModalMode] = useState<"write" | "edit">("write")
  const [editingReportId, setEditingReportId] = useState<number | null>(null)
  const [attendanceSearchQuery, setAttendanceSearchQuery] = useState("")
  
  // 공감/댓글 관련 상태
  const [attendanceLikes, setAttendanceLikes] = useState<Record<number, AttendanceLike[]>>({})
  const [attendanceComments, setAttendanceComments] = useState<Record<number, AttendanceComment[]>>({})
  const [expandedComments, setExpandedComments] = useState<number | null>(null)
  const [newCommentText, setNewCommentText] = useState("")
  const [newCommentNickname, setNewCommentNickname] = useState("")
  const [editingAttCommentId, setEditingAttCommentId] = useState<number | null>(null)
  const [editingAttCommentText, setEditingAttCommentText] = useState("")
  const [newAttendance, setNewAttendance] = useState({
    type: "출근" as "출근" | "퇴근",
    jeong1: "",
    jeong2: "",
    dailyReservation: "",
    dailyWork: "",
    giftManagement: ""
  })
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null)

  // 오류 보고 관련 상태
  const [showErrorReport, setShowErrorReport] = useState(false)
  const [showErrorReportModal, setShowErrorReportModal] = useState(false)
  const [newErrorReport, setNewErrorReport] = useState({
    title: "",
    description: "",
    reporter: ""
  })

  // 자료실 관련 상태
  const [showResources, setShowResources] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("전체")
  const [resourceSearch, setResourceSearch] = useState("")
  const [showResourceModal, setShowResourceModal] = useState(false)
  const [resourceModalMode, setResourceModalMode] = useState<"write" | "edit">("write")
  const [editingResourceId, setEditingResourceId] = useState<number | null>(null)
  const [newResource, setNewResource] = useState({
    title: "",
    category: "양식",
    description: "",
    linkUrl: ""
  })
const [showResourceDeleteConfirm, setShowResourceDeleteConfirm] = useState<number | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<{ fileName: string; fileUrl: string }[]>([])
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [showCategoryManager, setShowCategoryManager] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState("")
  
  // 댓글 관련 상태
  const [newComment, setNewComment] = useState({ nickname: "", content: "" })
  const [resourceComments, setResourceComments] = useState<Comment[]>([])
  const [isLoadingComments, setIsLoadingComments] = useState(false)
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null)
  const [editingCommentContent, setEditingCommentContent] = useState("")
  
  // 자료실 상세 보기 상태
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null)
  
  // 카테고리 수정 상태
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null)
  const [editingCategoryName, setEditingCategoryName] = useState("")
  
  // 보험사 연락처 관련 상태
  const [showInsurance, setShowInsurance] = useState(false)
  const [insuranceSearch, setInsuranceSearch] = useState("")
  const [selectedInsuranceCategory, setSelectedInsuranceCategory] = useState("전체")
  const [showInsuranceModal, setShowInsuranceModal] = useState(false)
  const [insuranceModalMode, setInsuranceModalMode] = useState<"write" | "edit">("write")
  const [editingInsuranceId, setEditingInsuranceId] = useState<number | null>(null)
const [newInsurance, setNewInsurance] = useState({
  name: "",
  category: "손해보험",
  logoUrl: "",
  homepageUrl: "",
  customerService: "",
  fax: "",
    address: "",
branchManagerName: "",
  branchManagerPhone: "",
  memo: ""
})
  const [showInsuranceDetailModal, setShowInsuranceDetailModal] = useState(false)
  const [insuranceViewMode, setInsuranceViewMode] = useState<"연락처" | "원수사">("연락처")
  const [isUploadingLogo, setIsUploadingLogo] = useState(false)
  const [selectedInsurance, setSelectedInsurance] = useState<InsuranceCompany | null>(null)
  const [showInsuranceDetailPopup, setShowInsuranceDetailPopup] = useState(false) // 원수사 상세 팝업
  const [showManagerModal, setShowManagerModal] = useState(false)
  const [newManager, setNewManager] = useState({ name: "", phone: "", kakaoUrl: "" })
  const [editingManagerId, setEditingManagerId] = useState<number | null>(null)
  const [showInsuranceDeleteConfirm, setShowInsuranceDeleteConfirm] = useState<number | null>(null)
  const [isAdmin, setIsAdmin] = useState(true)
  
  // 공지사항 관련 상태
  const [showNoticeBoard, setShowNoticeBoard] = useState(false)
  const [showNoticeModal, setShowNoticeModal] = useState(false)
  const [noticeModalMode, setNoticeModalMode] = useState<"write" | "edit">("write")
  const [editingNoticeId, setEditingNoticeId] = useState<number | null>(null)
  const [noticeSearchQuery, setNoticeSearchQuery] = useState("")
  const [noticeCategory, setNoticeCategory] = useState("전체")
  const [newNotice, setNewNotice] = useState({ title: "", content: "", author: "", category: "공지" })
  const [showNoticeDeleteConfirm, setShowNoticeDeleteConfirm] = useState<number | null>(null)
  const [expandedNotice, setExpandedNotice] = useState<number | null>(null)
  const [noticeLikes, setNoticeLikes] = useState<Record<number, NoticeLike[]>>({})
  const [noticeComments, setNoticeComments] = useState<Record<number, NoticeComment[]>>({})
  const [expandedNoticeComments, setExpandedNoticeComments] = useState<number | null>(null)
  const [newNoticeCommentText, setNewNoticeCommentText] = useState("")
  const [newNoticeCommentNickname, setNewNoticeCommentNickname] = useState("")
  const [editingNoticeCommentId, setEditingNoticeCommentId] = useState<number | null>(null)
  const [editingNoticeCommentText, setEditingNoticeCommentText] = useState("")
  
  // 공지사항 카테고리 관리 상태
  const [customNoticeCategories, setCustomNoticeCategories] = useState<string[]>(["공지"])
  const [showNoticeCatManager, setShowNoticeCatManager] = useState(false)
  const [newNoticeCatName, setNewNoticeCatName] = useState("")
  const [editingNoticeCatIndex, setEditingNoticeCatIndex] = useState<number | null>(null)
  const [editingNoticeCatName, setEditingNoticeCatName] = useState("")
  
  // 지점장/부지점장 관련 state
  const [showBranchManagerModal, setShowBranchManagerModal] = useState(false)
  const [newBranchManager, setNewBranchManager] = useState<{ name: string; phone: string; kakaoUrl: string; role: 'branch_manager' | 'assistant_branch_manager' | 'education_manager' }>({ name: "", phone: "", kakaoUrl: "", role: "branch_manager" })
  const [editingBranchManagerId, setEditingBranchManagerId] = useState<number | null>(null)
  
  // 교육매니저 관련 state
  const [showEducationManagerModal, setShowEducationManagerModal] = useState(false)
  const [newEducationManager, setNewEducationManager] = useState({ name: "", phone: "" })
  const [editingEducationManagerId, setEditingEducationManagerId] = useState<number | null>(null)
  
  // SWR로 데이터 가져오기
  const { data: reservationsData, mutate: mutateReservations } = useSWR<ReservationDB[]>(
    showCalendar ? "/api/reservations" : null,
    fetcher
  )
  const reservations: Reservation[] = reservationsData?.map(mapReservation) || []

const { data: attendanceData, mutate: mutateAttendance } = useSWR<AttendanceReportDB[]>(
    showAttendanceBoard ? "/api/attendance" : null,
    fetcher
  )
  const attendanceReports: AttendanceReport[] = attendanceData?.map(mapAttendanceReport) || []

const { data: resourcesData, mutate: mutateResources } = useSWR<ResourceDB[]>(
  showResources ? `/api/resources?category=${selectedCategory}` : null,
  fetcher
  )
  const resources: Resource[] = resourcesData?.map(mapResource) || []

const { data: categoriesData, mutate: mutateCategories } = useSWR<Category[]>(
    showResources ? "/api/categories" : null,
    fetcher
  )
  const categories: Category[] = categoriesData || []
  
// 사용자 프로필 (역할 확인용) - 개발 중에는 기본 true 유지
  const { data: profileData } = useSWR<{ role: string }>(
    "/api/profile",
    fetcher,
    { 
      onSuccess: (data) => {
        // admin이면 true, 그 외에는 기본값 true 유지 (개발용)
        if (data?.role === "admin") {
          setIsAdmin(true)
        }
      },
      onError: () => {
        // 에러 시에도 true 유지 (개발용)
        setIsAdmin(true)
      }
    }
  )

  // 보험사 데이터
const { data: insuranceData, mutate: mutateInsurance } = useSWR<InsuranceCompanyDB[]>(
  showInsurance ? "/api/insurance" : null,
  fetcher
  )
  const insuranceCompanies: InsuranceCompany[] = insuranceData?.map(mapInsuranceCompany) || []
  
  // 공지사항 데이터
  const { data: noticesData, mutate: mutateNotices } = useSWR<NoticeDB[]>(
    showNoticeBoard ? "/api/notices" : null,
    fetcher
  )
  const notices: Notice[] = noticesData?.map(mapNotice) || []

  // 선택된 보험사 업데이트 - 모달이 열려있을 때만 데이터 갱신
  useEffect(() => {
    if (selectedInsurance && showInsuranceDetailPopup && insuranceCompanies.length > 0) {
      const updated = insuranceCompanies.find(c => c.id === selectedInsurance.id)
      if (updated && JSON.stringify(updated) !== JSON.stringify(selectedInsurance)) {
        setSelectedInsurance({ ...updated })
      }
    }
  }, [insuranceCompanies, showInsuranceDetailPopup, selectedInsurance])

  // 모바일 뒤로가기 버튼 핸들러
  useEffect(() => {
    const handleBackButton = (e: PopStateEvent) => {
      // 열려있는 모달/팝업 체크 (우선순위대로)
      if (showNoticeDeleteConfirm !== null) {
        e.preventDefault()
        setShowNoticeDeleteConfirm(null)
        window.history.pushState(null, '', window.location.href)
        return
      }
      if (showResourceDeleteConfirm !== null) {
        e.preventDefault()
        setShowResourceDeleteConfirm(null)
        window.history.pushState(null, '', window.location.href)
        return
      }
      if (showNoticeCatManager) {
        e.preventDefault()
        setShowNoticeCatManager(false)
        window.history.pushState(null, '', window.location.href)
        return
      }
      if (showCategoryManager) {
        e.preventDefault()
        setShowCategoryManager(false)
        window.history.pushState(null, '', window.location.href)
        return
      }
      if (showNoticeModal) {
        e.preventDefault()
        setShowNoticeModal(false)
        window.history.pushState(null, '', window.location.href)
        return
      }
      if (showResourceModal) {
        e.preventDefault()
        setShowResourceModal(false)
        window.history.pushState(null, '', window.location.href)
        return
      }
      if (showInsuranceModal) {
        e.preventDefault()
        setShowInsuranceModal(false)
        window.history.pushState(null, '', window.location.href)
        return
      }
      if (showAttendanceModal) {
        e.preventDefault()
        setShowAttendanceModal(false)
        window.history.pushState(null, '', window.location.href)
        return
      }
      if (showManagerModal) {
        e.preventDefault()
        setShowManagerModal(false)
        window.history.pushState(null, '', window.location.href)
        return
      }
      if (showBranchManagerModal) {
        e.preventDefault()
        setShowBranchManagerModal(false)
        window.history.pushState(null, '', window.location.href)
        return
      }
      if (showEducationManagerModal) {
        e.preventDefault()
        setShowEducationManagerModal(false)
        window.history.pushState(null, '', window.location.href)
        return
      }
      if (showInsuranceDetailPopup) {
        e.preventDefault()
        setShowInsuranceDetailPopup(false)
        setSelectedInsurance(null)
        window.history.pushState(null, '', window.location.href)
        return
      }
      if (selectedResource) {
        e.preventDefault()
        setSelectedResource(null)
        window.history.pushState(null, '', window.location.href)
        return
      }
      // 서브 페이지들 (자료실, 출퇴근, 캘린더, 공지사항, 보험사 목록)
      if (showResources) {
        e.preventDefault()
        setShowResources(false)
        window.history.pushState(null, '', window.location.href)
        return
      }
      if (showAttendanceBoard) {
        e.preventDefault()
        setShowAttendanceBoard(false)
        window.history.pushState(null, '', window.location.href)
        return
      }
      if (showCalendar) {
        e.preventDefault()
        setShowCalendar(false)
        window.history.pushState(null, '', window.location.href)
        return
      }
      if (showNoticeBoard) {
        e.preventDefault()
        setShowNoticeBoard(false)
        window.history.pushState(null, '', window.location.href)
        return
      }
      if (showInsurance) {
        e.preventDefault()
        setShowInsurance(false)
        window.history.pushState(null, '', window.location.href)
        return
      }
      // 메인 화면에서 뒤로가기 - 종료 확인
      e.preventDefault()
      if (window.confirm('앱을 종료하시겠습니까?')) {
        window.history.back()
      } else {
        window.history.pushState(null, '', window.location.href)
      }
    }

    // 초기 히스토리 상태 설정
    window.history.pushState(null, '', window.location.href)
    window.addEventListener('popstate', handleBackButton)

    return () => {
      window.removeEventListener('popstate', handleBackButton)
    }
  }, [
    showNoticeDeleteConfirm, showResourceDeleteConfirm, showNoticeCatManager, showCategoryManager,
    showNoticeModal, showResourceModal, showInsuranceModal, showAttendanceModal,
    showManagerModal, showBranchManagerModal, showEducationManagerModal, showInsuranceDetailPopup,
    selectedResource, showResources, showAttendanceBoard, showCalendar, showNoticeBoard, showInsurance
  ])
  
  // 안전한 보험사 선택 함수
  const openInsuranceDetail = (company: InsuranceCompany) => {
    setSelectedInsurance(null)
    setTimeout(() => {
      setSelectedInsurance({ ...company })
      setShowInsuranceDetailPopup(true)
    }, 0)
  }
  
  // 안전한 담당자 모달 열기 함수
  const openManagerAddModal = (company: InsuranceCompany) => {
    setSelectedInsurance(null)
    setTimeout(() => {
      setSelectedInsurance({ ...company })
      setNewManager({ name: "", phone: "", kakaoUrl: "" })
      setEditingManagerId(null)
      setShowManagerModal(true)
    }, 0)
  }
  
  // 안전한 지점장/부지점장/교육매니저 모달 열기 함수
  const openBranchManagerAddModal = (company: InsuranceCompany) => {
    setSelectedInsurance(null)
    setTimeout(() => {
      setSelectedInsurance({ ...company })
      setNewBranchManager({ name: "", phone: "", kakaoUrl: "", role: "branch_manager" })
      setEditingBranchManagerId(null)
      setShowBranchManagerModal(true)
    }, 0)
  }
  
  // 보험사 카테고리 목록
  const insuranceCategories = ["전체", "손해보험", "생명보험", "공제보험", "기타보험"]
  
  // 보험사 필터링
  const filteredInsurance = insuranceCompanies.filter(company => {
    const matchesCategory = selectedInsuranceCategory === "전체" || company.category === selectedInsuranceCategory
    const matchesSearch = !insuranceSearch || 
      company.name.toLowerCase().includes(insuranceSearch.toLowerCase()) ||
      company.branchManagerName?.toLowerCase().includes(insuranceSearch.toLowerCase()) ||
      company.managers.some(m => m.name.toLowerCase().includes(insuranceSearch.toLowerCase()))
    return matchesCategory && matchesSearch
  })
  const categoryNames = ["전체", ...categories.map(c => c.name)]

  // 자료실 검색 필터링
  const filteredResources = resources.filter(r => {
    if (!resourceSearch.trim()) return true
    const search = resourceSearch.toLowerCase()
    return (
      r.title.toLowerCase().includes(search) ||
      r.description.toLowerCase().includes(search) ||
      r.category.toLowerCase().includes(search)
    )
  })

// vCard 파일 생성 및 다운로드 함수
  const downloadVCard = (name: string, position: string, company: string, phone: string) => {
    // PC인지 모바일인지 확인
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    
    if (!isMobile) {
      alert("연락처 저장은 모바일 버전에서만 지원됩니다.")
      return
    }
    
    try {
      const vCard = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `FN:${name}`,
        `N:${name};;;`,
        `ORG:${company}`,
        `TITLE:${position}`,
        `TEL;TYPE=CELL:${phone}`,
        'END:VCARD'
      ].join('\r\n')
      
      // data URL 방식 사용 (blob URL보다 모바일 호환성 좋음)
      const dataUrl = 'data:text/vcard;charset=utf-8,' + encodeURIComponent(vCard)
      
      // 다운로드 링크 생성
      const link = document.createElement('a')
      link.href = dataUrl
      link.download = `${name}_${company}.vcf`
      link.style.cssText = 'position:fixed;left:-9999px;top:-9999px;visibility:hidden;'
      document.body.appendChild(link)
      
      // 클릭 후 즉시 제거
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('vCard 생성 오류:', error)
      alert('연락처 저장에 실패했습니다.')
    }
  }

const handleMenuClick = (item: typeof menuItems[0]) => {
    if (item.isCalendar) {
      setShowCalendar(true)
    } else if (item.isExternal) {
      window.open(item.href, "_blank")
    } else if (item.isAttendance) {
      setShowAttendanceBoard(true)
    } else if ((item as { isErrorReport?: boolean }).isErrorReport) {
      setShowErrorReport(true)
    } else if (item.isResources) {
      setShowResources(true)
} else if ((item as { isInsurance?: boolean }).isInsurance) {
    setInsuranceViewMode("연락처")
    setShowInsurance(true)
  } else if ((item as { isNetwork?: boolean }).isNetwork) {
    setInsuranceViewMode("원수사")
    setShowInsurance(true)
  } else if ((item as { isNotices?: boolean }).isNotices) {
    setShowNoticeBoard(true)
  }
  }

// 출퇴근 보고 관련 함수들
  const getSortedReports = () => {
    let filtered = [...attendanceReports]
    
    // 검색 필터링
    if (attendanceSearchQuery.trim()) {
      const query = attendanceSearchQuery.trim().toLowerCase()
      filtered = filtered.filter((report) => {
        // 날짜 검색 (2026.05.16, 2026-05-16, 05.16 등)
        const date = new Date(report.createdAt)
        const dateStr1 = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`
        const dateStr2 = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
        const dateStr3 = `${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`
        
        return (
          report.type.toLowerCase().includes(query) ||
          report.jeong1.toLowerCase().includes(query) ||
          report.jeong2.toLowerCase().includes(query) ||
          report.dailyReservation.toLowerCase().includes(query) ||
          report.dailyWork.toLowerCase().includes(query) ||
          report.giftManagement.toLowerCase().includes(query) ||
          dateStr1.includes(query) ||
          dateStr2.includes(query) ||
          dateStr3.includes(query)
        )
      })
    }
    
    return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }
  
  // 공감/댓글 데이터 불러오기
  const fetchLikesForReport = async (reportId: number) => {
    try {
      const res = await fetch(`/api/attendance/likes?reportId=${reportId}`)
      if (res.ok) {
        const data = await res.json()
        setAttendanceLikes(prev => ({ ...prev, [reportId]: data }))
      }
    } catch (e) { /* ignore */ }
  }

  const fetchCommentsForReport = async (reportId: number) => {
    try {
      const res = await fetch(`/api/attendance/comments?reportId=${reportId}`)
      if (res.ok) {
        const data = await res.json()
        setAttendanceComments(prev => ({ ...prev, [reportId]: data }))
      }
    } catch (e) { /* ignore */ }
  }

  // 출퇴근 보고 목록이 로드될 때 공감/댓글 데이터도 불러오기
  useEffect(() => {
    if (attendanceReports.length > 0) {
      attendanceReports.forEach((report) => {
        fetchLikesForReport(report.id)
        fetchCommentsForReport(report.id)
      })
    }
  }, [attendanceReports.length])

  // 공감 토글
  const toggleLike = async (reportId: number) => {
    try {
      const res = await fetch("/api/attendance/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reportId, userId: "anonymous" }),
      })
      if (res.ok) {
        fetchLikesForReport(reportId)
      }
    } catch (e) { /* ignore */ }
  }

  // 댓글 작성
  const submitComment = async (reportId: number) => {
    if (!newCommentText.trim()) return
    try {
      const res = await fetch("/api/attendance/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reportId,
          nickname: newCommentNickname.trim() || "익명",
          content: newCommentText.trim(),
          userId: "anonymous",
        }),
      })
      if (res.ok) {
        setNewCommentText("")
        fetchCommentsForReport(reportId)
      }
    } catch (e) { /* ignore */ }
  }

  // 댓글 수정
  const updateComment = async (commentId: number, reportId: number) => {
    if (!editingAttCommentText.trim()) return
    try {
      const res = await fetch("/api/attendance/comments", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: commentId, content: editingAttCommentText.trim() }),
      })
      if (res.ok) {
        setEditingAttCommentId(null)
        setEditingAttCommentText("")
        fetchCommentsForReport(reportId)
      }
    } catch (e) { /* ignore */ }
  }

  // 댓글 삭제
  const deleteComment = async (commentId: number, reportId: number) => {
    try {
      const res = await fetch(`/api/attendance/comments?id=${commentId}`, { method: "DELETE" })
      if (res.ok) {
        fetchCommentsForReport(reportId)
      }
    } catch (e) { /* ignore */ }
  }

  const getReportLikes = (reportId: number) => attendanceLikes[reportId] || []
  const getReportComments = (reportId: number) => attendanceComments[reportId] || []
  const isLikedByMe = (reportId: number) => getReportLikes(reportId).some(l => l.user_id === "anonymous")

  // ===== 공지사항 관련 함수들 =====
  
  // localStorage에서 카테고리 로드
  useEffect(() => {
    try {
      const saved = localStorage.getItem("noticeCategories")
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCustomNoticeCategories(parsed)
        }
      }
    } catch (e) { /* ignore */ }
  }, [])

  // 카테고리 변경 시 localStorage에 저장
  const saveCategories = (cats: string[]) => {
    setCustomNoticeCategories(cats)
    localStorage.setItem("noticeCategories", JSON.stringify(cats))
  }

  // "전체" + 사용자 카테고리 결합
  const noticeCategories = ["전체", ...customNoticeCategories]

  // 카테고리 관리 함수
  const addCategory = () => {
    const name = newNoticeCatName.trim()
    if (!name || customNoticeCategories.includes(name) || name === "전체") return
    saveCategories([...customNoticeCategories, name])
    setNewNoticeCatName("")
  }

  const updateCategory = (index: number) => {
    const name = editingNoticeCatName.trim()
    if (!name || name === "전체") return
    const existing = customNoticeCategories.filter((_, i) => i !== index)
    if (existing.includes(name)) return
    const updated = [...customNoticeCategories]
    updated[index] = name
    saveCategories(updated)
    setEditingNoticeCatIndex(null)
    setEditingNoticeCatName("")
  }

  const deleteCategory = (index: number) => {
    const updated = customNoticeCategories.filter((_, i) => i !== index)
    saveCategories(updated)
    // 현재 선택된 카테고리가 삭제된 카테고리였으면 "전체"로 복귀
    if (noticeCategory === customNoticeCategories[index]) {
      setNoticeCategory("전체")
    }
  }

  const moveCategoryUp = (index: number) => {
    if (index === 0) return
    const updated = [...customNoticeCategories]
    ;[updated[index - 1], updated[index]] = [updated[index], updated[index - 1]]
    saveCategories(updated)
  }

  const moveCategoryDown = (index: number) => {
    if (index === customNoticeCategories.length - 1) return
    const updated = [...customNoticeCategories]
    ;[updated[index], updated[index + 1]] = [updated[index + 1], updated[index]]
    saveCategories(updated)
  }

  const getFilteredNotices = () => {
    let filtered = [...notices]
    if (noticeCategory !== "전체") {
      filtered = filtered.filter(n => n.category === noticeCategory)
    }
    if (noticeSearchQuery.trim()) {
      const q = noticeSearchQuery.trim().toLowerCase()
      filtered = filtered.filter(n =>
        n.title.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q) ||
        n.author.toLowerCase().includes(q) ||
        n.category.toLowerCase().includes(q)
      )
    }
    return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  const handleSaveNotice = async () => {
    if (!newNotice.title.trim() || !newNotice.content.trim()) return
    setIsSaving(true)
    try {
      if (noticeModalMode === "edit" && editingNoticeId) {
        await fetch("/api/notices", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingNoticeId, ...newNotice }),
        })
      } else {
        await fetch("/api/notices", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newNotice),
        })
      }
      mutateNotices()
      setShowNoticeModal(false)
      setNewNotice({ title: "", content: "", author: "", category: "공지" })
      setEditingNoticeId(null)
    } catch (e) { /* ignore */ }
    setIsSaving(false)
  }

  const handleDeleteNotice = async (id: number) => {
    try {
      await fetch(`/api/notices?id=${id}`, { method: "DELETE" })
      mutateNotices()
      setShowNoticeDeleteConfirm(null)
    } catch (e) { /* ignore */ }
  }

  const openEditNoticeModal = (notice: Notice) => {
    setNoticeModalMode("edit")
    setEditingNoticeId(notice.id)
    setNewNotice({ title: notice.title, content: notice.content, author: notice.author, category: notice.category })
    setShowNoticeModal(true)
  }

  // 공지사항 공감/댓글 함수
  const fetchNoticeLikes = async (noticeId: number) => {
    try {
      const res = await fetch(`/api/notices/likes?noticeId=${noticeId}`)
      if (res.ok) {
        const data = await res.json()
        setNoticeLikes(prev => ({ ...prev, [noticeId]: data }))
      }
    } catch (e) { /* ignore */ }
  }

  const fetchNoticeComments = async (noticeId: number) => {
    try {
      const res = await fetch(`/api/notices/comments?noticeId=${noticeId}`)
      if (res.ok) {
        const data = await res.json()
        setNoticeComments(prev => ({ ...prev, [noticeId]: data }))
      }
    } catch (e) { /* ignore */ }
  }

  useEffect(() => {
    if (notices.length > 0) {
      notices.forEach((n) => {
        fetchNoticeLikes(n.id)
        fetchNoticeComments(n.id)
      })
    }
  }, [notices.length])

  const toggleNoticeLike = async (noticeId: number) => {
    try {
      const res = await fetch("/api/notices/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ noticeId, userId: "anonymous" }),
      })
      if (res.ok) fetchNoticeLikes(noticeId)
    } catch (e) { /* ignore */ }
  }

  const submitNoticeComment = async (noticeId: number) => {
    if (!newNoticeCommentText.trim()) return
    try {
      const res = await fetch("/api/notices/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          noticeId,
          nickname: newNoticeCommentNickname.trim() || "익명",
          content: newNoticeCommentText.trim(),
          userId: "anonymous",
        }),
      })
      if (res.ok) {
        setNewNoticeCommentText("")
        fetchNoticeComments(noticeId)
      }
    } catch (e) { /* ignore */ }
  }

  const updateNoticeComment = async (commentId: number, noticeId: number) => {
    if (!editingNoticeCommentText.trim()) return
    try {
      const res = await fetch("/api/notices/comments", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: commentId, content: editingNoticeCommentText.trim() }),
      })
      if (res.ok) {
        setEditingNoticeCommentId(null)
        setEditingNoticeCommentText("")
        fetchNoticeComments(noticeId)
      }
    } catch (e) { /* ignore */ }
  }

  const deleteNoticeComment = async (commentId: number, noticeId: number) => {
    try {
      const res = await fetch(`/api/notices/comments?id=${commentId}`, { method: "DELETE" })
      if (res.ok) fetchNoticeComments(noticeId)
    } catch (e) { /* ignore */ }
  }

  const getNoticeLikes = (id: number) => noticeLikes[id] || []
  const getNoticeComments = (id: number) => noticeComments[id] || []
  const isNoticeLikedByMe = (id: number) => getNoticeLikes(id).some(l => l.user_id === "anonymous")

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${year}.${month}.${day} ${hours}:${minutes}`
  }

const openWriteModal = () => {
    setAttendanceModalMode("write")
    setNewAttendance({
      type: "출근",
      jeong1: "",
      jeong2: "",
      dailyReservation: "",
      dailyWork: "",
      giftManagement: ""
    })
    setShowAttendanceModal(true)
  }

  const openEditModal = (report: AttendanceReport) => {
    setAttendanceModalMode("edit")
    setEditingReportId(report.id)
    setNewAttendance({
      type: report.type,
      jeong1: report.jeong1,
      jeong2: report.jeong2,
      dailyReservation: report.dailyReservation,
      dailyWork: report.dailyWork,
      giftManagement: report.giftManagement
    })
    setShowAttendanceModal(true)
  }

  const handleSaveAttendance = async () => {
    setIsSaving(true)
    try {
      if (attendanceModalMode === "write") {
        await fetch("/api/attendance", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newAttendance)
        })
      } else if (attendanceModalMode === "edit" && editingReportId) {
        await fetch("/api/attendance", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingReportId, ...newAttendance })
        })
      }
      
      await mutateAttendance()
      setShowAttendanceModal(false)
      setNewAttendance({ 
        type: "출근", 
        jeong1: "",
        jeong2: "",
        dailyReservation: "",
        dailyWork: "",
        giftManagement: ""
      })
      setEditingReportId(null)
    } catch (error) {
      console.error("Error saving attendance:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteReport = async (id: number) => {
    setIsSaving(true)
    try {
      await fetch(`/api/attendance?id=${id}`, { method: "DELETE" })
      await mutateAttendance()
      setShowDeleteConfirm(null)
    } catch (error) {
      console.error("Error deleting report:", error)
    } finally {
      setIsSaving(false)
    }
  }

  // 달력 관련 함수들
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const formatDateString = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  }

  const getReservationsForDate = (dateString: string) => {
    return reservations.filter(r => r.date === dateString)
  }

  const getTodayString = () => {
    const today = new Date()
    return formatDateString(today.getFullYear(), today.getMonth(), today.getDate())
  }

  const handleSaveReservation = async () => {
    if (!newReservation.date || !newReservation.time || !newReservation.customerName || !newReservation.manager) {
      return
    }
    
    setIsSaving(true)
    try {
      if (reservationModalMode === "add") {
        await fetch("/api/reservations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newReservation)
        })
      } else if (reservationModalMode === "edit" && editingReservationId) {
        await fetch("/api/reservations", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingReservationId, ...newReservation })
        })
      }
      
      await mutateReservations()
      setNewReservation({
        date: "",
        time: "",
        customerName: "",
        manager: "",
        route: "",
        memo: ""
      })
      setShowAddModal(false)
      setEditingReservationId(null)
      setReservationModalMode("add")
    } catch (error) {
      console.error("Error saving reservation:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteReservation = async (id: number) => {
    setIsSaving(true)
    try {
      await fetch(`/api/reservations?id=${id}`, { method: "DELETE" })
      await mutateReservations()
      setShowReservationDeleteConfirm(null)
    } catch (error) {
      console.error("Error deleting reservation:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const openEditReservationModal = (reservation: Reservation) => {
    setReservationModalMode("edit")
    setEditingReservationId(reservation.id)
    setNewReservation({
      date: reservation.date,
      time: reservation.time,
      customerName: reservation.customerName,
      manager: reservation.manager,
      route: reservation.route,
      memo: reservation.memo
    })
    setShowAddModal(true)
  }

  // 예약 리스트 검색 및 정렬
  const filteredAndSortedReservations = reservations
    .filter(r => {
      if (!reservationSearch.trim()) return true
      const search = reservationSearch.toLowerCase()
      return (
        r.customerName.toLowerCase().includes(search) ||
        r.manager.toLowerCase().includes(search) ||
        r.date.includes(search) ||
        r.route.toLowerCase().includes(search) ||
        r.memo.toLowerCase().includes(search)
      )
    })
    .sort((a, b) => {
      if (reservationSort === "newest") {
        return b.id - a.id
      } else {
        // upcoming: 예약일 가까운 순
        return a.date.localeCompare(b.date) || a.time.localeCompare(b.time)
      }
    })

  const openAddModal = (dateString?: string) => {
    setReservationModalMode("add")
    setEditingReservationId(null)
    setNewReservation({
      date: dateString || "",
      time: "",
      customerName: "",
      manager: "",
      route: "",
      memo: ""
    })
    setShowAddModal(true)
  }

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []
    const weekDays = ['일', '월', '화', '수', '목', '금', '토']

    // 빈 셀 추가
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="min-h-[100px] md:min-h-[120px] bg-rose-50/30 rounded-lg" />)
    }

    // 날짜 셀 추가
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = formatDateString(currentDate.getFullYear(), currentDate.getMonth(), day)
      const dayReservations = getReservationsForDate(dateString)
      const isToday = dateString === getTodayString()

      days.push(
        <div 
          key={day} 
          onClick={() => setSelectedDate(dateString)}
          className={cn(
            "min-h-[100px] md:min-h-[120px] p-1.5 md:p-2 rounded-lg border transition-all cursor-pointer",
            isToday ? "border-rose-400 bg-rose-50" : "border-rose-100 bg-white hover:border-rose-200",
            dayReservations.length > 0 && "ring-1 ring-rose-200",
            selectedDate === dateString && "ring-2 ring-rose-400"
          )}
        >
          <div className={cn(
            "text-xs md:text-sm font-medium mb-1",
            isToday && "text-rose-500"
          )}>
            {day}
          </div>
          <div className="space-y-0.5 md:space-y-1">
            {dayReservations.map((reservation) => (
              <div 
                key={reservation.id}
                className="text-[10px] md:text-xs p-1 md:p-1.5 rounded bg-rose-100 border border-rose-200"
              >
                <div className="font-medium text-gray-700 truncate">
                  {reservation.time} {reservation.manager}
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }

    return (
      <div className="space-y-4">
        {/* 달력 헤더 */}
        <div className="flex items-center justify-between">
          <Button variant="outline" size="icon" onClick={prevMonth} className="border-rose-200 hover:bg-rose-50">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h3 className="text-lg md:text-xl font-semibold text-gray-800">
            {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
          </h3>
          <Button variant="outline" size="icon" onClick={nextMonth} className="border-rose-200 hover:bg-rose-50">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* 요일 헤더 */}
        <div className="grid grid-cols-7 gap-1 md:gap-2">
          {weekDays.map((day, index) => (
            <div 
              key={day} 
              className={cn(
                "text-center text-xs md:text-sm font-medium py-2",
                index === 0 && "text-rose-500",
                index === 6 && "text-blue-500"
              )}
            >
              {day}
            </div>
          ))}
        </div>

                {/* 날짜 그리드 */}
        <div className="grid grid-cols-7 gap-1 md:gap-2">
          {days}
        </div>

        {/* 범례 */}
        <div className="flex items-center gap-4 text-xs md:text-sm text-gray-500 pt-2 border-t border-rose-100">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-rose-100 border border-rose-200" />
            <span>예약 있음</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded border-2 border-rose-400" />
            <span>오늘</span>
          </div>
        </div>
      </div>
    )
  }

  // 선택된 날짜의 예약 목록
  const selectedDateReservations = selectedDate ? getReservationsForDate(selectedDate) : []

  // 선택된 날짜 포맷
  const formatSelectedDate = () => {
    if (!selectedDate) return ""
    const [year, month, day] = selectedDate.split("-")
    return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`
  }

  // ===== 공지사항 게시판 UI =====
  if (showNoticeBoard) {
    const filteredNotices = getFilteredNotices()
    
    return (
      <main className="min-h-screen bg-rose-50/30">
        <div className="max-w-2xl mx-auto p-4 md:p-6">
          {/* 헤더 */}
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => setShowNoticeBoard(false)} className="p-2 rounded-xl hover:bg-rose-100 text-gray-600">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h1 className="text-lg font-bold text-gray-800">공지사항</h1>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setShowNoticeCatManager(true)}
                className="p-2 rounded-xl hover:bg-rose-100 text-gray-400 hover:text-rose-500 transition-colors"
                title="카테고리 관리"
              >
                <Settings className="h-4 w-4" />
              </button>
              <Button
                size="sm"
                onClick={() => { setNoticeModalMode("write"); setNewNotice({ title: "", content: "", author: "", category: "공지" }); setEditingNoticeId(null); setShowNoticeModal(true); }}
                className="bg-rose-400 hover:bg-rose-500 text-white rounded-xl text-xs px-3 py-1.5 h-auto"
              >
                <Plus className="h-3.5 w-3.5 mr-1" />
                글쓰기
              </Button>
            </div>
          </div>

          {/* 카테고리 탭 */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-3 scrollbar-hide">
            {noticeCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setNoticeCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                  noticeCategory === cat
                    ? "bg-rose-400 text-white"
                    : "bg-white text-gray-600 hover:bg-rose-100 border border-rose-200"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 검색창 */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="제목, 내용, 작성자 검색"
              value={noticeSearchQuery}
              onChange={(e) => setNoticeSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-rose-200 bg-white focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-300 text-sm placeholder-gray-400"
            />
            {noticeSearchQuery && (
              <button onClick={() => setNoticeSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* 게시글 목록 */}
          {filteredNotices.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <Megaphone className="h-12 w-12 mx-auto mb-3 text-rose-200" />
              <p className="text-sm">등록된 공지사항이 없습니다</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredNotices.map((notice) => (
                <div key={notice.id} className="bg-white rounded-2xl p-4 shadow-sm border border-rose-100">
                  {/* 카드 헤더 */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className={cn(
                          "text-[10px] px-2 py-0.5 rounded-full font-medium",
                          notice.category === "공지" ? "bg-rose-100 text-rose-600" :
                          "bg-gray-100 text-gray-600"
                        )}>
                          {notice.category}
                        </Badge>
                        <span className="text-[10px] text-gray-400">
                          {new Date(notice.createdAt).toLocaleDateString("ko-KR", { year: "numeric", month: "short", day: "numeric" })}
                        </span>
                        {notice.isEdited && <span className="text-[10px] text-gray-400">(수정됨)</span>}
                      </div>
                      <button 
                        onClick={() => setExpandedNotice(expandedNotice === notice.id ? null : notice.id)}
                        className="text-left w-full"
                      >
                        <h3 className="font-bold text-gray-800 text-sm leading-snug">{notice.title}</h3>
                      </button>
                      <p className="text-xs text-gray-400 mt-1">작성자: {notice.author}</p>
                    </div>
                    {isAdmin && (
                      <div className="flex items-center gap-1 ml-2">
                        <button onClick={() => openEditNoticeModal(notice)} className="p-1.5 rounded-lg hover:bg-rose-50 text-gray-400 hover:text-rose-400">
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button onClick={() => setShowNoticeDeleteConfirm(notice.id)} className="p-1.5 rounded-lg hover:bg-rose-50 text-gray-400 hover:text-rose-500">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* 삭제 확인 */}
                  {showNoticeDeleteConfirm === notice.id && (
                    <div className="mt-2 p-3 bg-rose-50 rounded-xl flex items-center justify-between">
                      <span className="text-xs text-rose-600">삭제하시겠습니까?</span>
                      <div className="flex gap-2">
                        <button onClick={() => handleDeleteNotice(notice.id)} className="text-xs px-3 py-1 bg-rose-500 text-white rounded-lg">삭제</button>
                        <button onClick={() => setShowNoticeDeleteConfirm(null)} className="text-xs px-3 py-1 bg-gray-200 text-gray-600 rounded-lg">취소</button>
                      </div>
                    </div>
                  )}

                  {/* 본문 (펼치기/접기) */}
                  {expandedNotice === notice.id && (
                    <div className="mt-3 pt-3 border-t border-rose-100">
                      <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{notice.content}</p>
                    </div>
                  )}

                  {/* 공감 & 댓글 버튼 */}
                  <div className="flex items-center gap-4 mt-3 pt-3 border-t border-rose-100">
                    <button
                      onClick={() => toggleNoticeLike(notice.id)}
                      className={cn(
                        "flex items-center gap-1.5 text-sm font-medium transition-colors",
                        isNoticeLikedByMe(notice.id) ? "text-rose-500" : "text-gray-400 hover:text-rose-400"
                      )}
                    >
                      <Heart className={cn("h-4 w-4", isNoticeLikedByMe(notice.id) && "fill-rose-500")} />
                      <span>공감 {getNoticeLikes(notice.id).length > 0 ? getNoticeLikes(notice.id).length : ""}</span>
                    </button>
                    <button
                      onClick={() => setExpandedNoticeComments(expandedNoticeComments === notice.id ? null : notice.id)}
                      className={cn(
                        "flex items-center gap-1.5 text-sm font-medium transition-colors",
                        expandedNoticeComments === notice.id ? "text-rose-500" : "text-gray-400 hover:text-rose-400"
                      )}
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>댓글 {getNoticeComments(notice.id).length > 0 ? getNoticeComments(notice.id).length : ""}</span>
                    </button>
                  </div>

                  {/* 댓글 영역 */}
                  {expandedNoticeComments === notice.id && (
                    <div className="mt-3 pt-3 border-t border-rose-100">
                      {getNoticeComments(notice.id).length > 0 && (
                        <div className="space-y-2 mb-3">
                          {getNoticeComments(notice.id).map((comment) => (
                            <div key={comment.id} className="p-2.5 bg-rose-50/50 rounded-lg border border-rose-100">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-semibold text-gray-700">{comment.nickname}</span>
                                <div className="flex items-center gap-1">
                                  <span className="text-[10px] text-gray-400">
                                    {new Date(comment.created_at).toLocaleDateString("ko-KR", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                                  </span>
                                  <button onClick={() => { setEditingNoticeCommentId(comment.id); setEditingNoticeCommentText(comment.content); }} className="p-0.5 text-gray-300 hover:text-rose-400">
                                    <Pencil className="h-3 w-3" />
                                  </button>
                                  <button onClick={() => deleteNoticeComment(comment.id, notice.id)} className="p-0.5 text-gray-300 hover:text-rose-500">
                                    <X className="h-3 w-3" />
                                  </button>
                                </div>
                              </div>
                              {editingNoticeCommentId === comment.id ? (
                                <div className="flex items-center gap-2">
                                  <input
                                    type="text"
                                    value={editingNoticeCommentText}
                                    onChange={(e) => setEditingNoticeCommentText(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && updateNoticeComment(comment.id, notice.id)}
                                    className="flex-1 text-sm border border-rose-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-rose-300"
                                    autoFocus
                                  />
                                  <button onClick={() => updateNoticeComment(comment.id, notice.id)} className="text-xs px-2 py-1 bg-rose-400 text-white rounded-lg hover:bg-rose-500">수정</button>
                                  <button onClick={() => { setEditingNoticeCommentId(null); setEditingNoticeCommentText(""); }} className="text-xs px-2 py-1 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300">취소</button>
                                </div>
                              ) : (
                                <p className="text-sm text-gray-600">{comment.content}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                      {/* 댓글 입력 */}
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="닉네임"
                          value={newNoticeCommentNickname}
                          onChange={(e) => setNewNoticeCommentNickname(e.target.value)}
                          className="w-20 text-sm border border-rose-200 rounded-lg px-2 py-2 focus:outline-none focus:ring-1 focus:ring-rose-300 placeholder-gray-400"
                        />
                        <input
                          type="text"
                          placeholder="댓글을 입력하세요"
                          value={newNoticeCommentText}
                          onChange={(e) => setNewNoticeCommentText(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && submitNoticeComment(notice.id)}
                          className="flex-1 text-sm border border-rose-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-rose-300 placeholder-gray-400"
                        />
                        <button
                          onClick={() => submitNoticeComment(notice.id)}
                          disabled={!newNoticeCommentText.trim()}
                          className="p-2 bg-rose-400 hover:bg-rose-500 disabled:bg-gray-300 text-white rounded-lg transition-colors"
                        >
                          <Send className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 글쓰기/수정 모달 */}
        {showNoticeModal && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-end justify-center">
            <div className="bg-white rounded-t-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-gray-800">
                  {noticeModalMode === "write" ? "공지사항 작성" : "공지사항 수정"}
                </h2>
                <button onClick={() => { setShowNoticeModal(false); setEditingNoticeId(null); }} className="p-2 rounded-xl hover:bg-gray-100">
                  <X className="h-5 w-5 text-gray-400" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">카테���리</Label>
                  <div className="flex gap-2 mt-1.5 flex-wrap">
                    {customNoticeCategories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setNewNotice({ ...newNotice, category: cat })}
                        className={cn(
                          "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                          newNotice.category === cat
                            ? "bg-rose-400 text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-rose-100"
                        )}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">제목</Label>
                  <Input
                    placeholder="공지사항 제목을 입력하세요"
                    value={newNotice.title}
                    onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                    className="mt-1 border-rose-200 focus:ring-[#ff8fa3] focus:border-[#ff8fa3]"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">내용</Label>
                  <Textarea
                    placeholder="공지사항 내용을 입력하세요"
                    value={newNotice.content}
                    onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                    className="mt-1 min-h-[200px] border-rose-200 focus:ring-[#ff8fa3] focus:border-[#ff8fa3]"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">작성자</Label>
                  <Input
                    placeholder="작성자 이름 (선택, 기본: 익명)"
                    value={newNotice.author}
                    onChange={(e) => setNewNotice({ ...newNotice, author: e.target.value })}
                    className="mt-1 border-rose-200 focus:ring-[#ff8fa3] focus:border-[#ff8fa3]"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button variant="outline" onClick={() => { setShowNoticeModal(false); setEditingNoticeId(null); }} className="flex-1 border-rose-200 text-gray-600 rounded-xl">
                  취소
                </Button>
                <Button
                  onClick={handleSaveNotice}
                  disabled={isSaving || !newNotice.title.trim() || !newNotice.content.trim()}
                  className="flex-1 bg-rose-400 hover:bg-rose-500 text-white rounded-xl disabled:opacity-50"
                >
                  {isSaving ? "저장 중..." : "저장"}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* 카테고리 관리 모달 */}
        {showNoticeCatManager && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-end justify-center">
            <div className="bg-white rounded-t-3xl w-full max-w-2xl max-h-[80vh] overflow-y-auto p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-gray-800">카테고리 관리</h2>
                <button onClick={() => { setShowNoticeCatManager(false); setEditingNoticeCatIndex(null); setNewNoticeCatName(""); }} className="p-2 rounded-xl hover:bg-gray-100">
                  <X className="h-5 w-5 text-gray-400" />
                </button>
              </div>

              {/* 카테고리 추가 */}
              <div className="flex items-center gap-2 mb-4">
                <input
                  type="text"
                  placeholder="새 카테고리 이름"
                  value={newNoticeCatName}
                  onChange={(e) => setNewNoticeCatName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addCategory()}
                  className="flex-1 text-sm border border-rose-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-rose-300 placeholder-gray-400"
                />
                <Button
                  onClick={addCategory}
                  disabled={!newNoticeCatName.trim() || customNoticeCategories.includes(newNoticeCatName.trim())}
                  className="bg-rose-400 hover:bg-rose-500 text-white rounded-xl px-4 disabled:opacity-50"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  추가
                </Button>
              </div>

              {/* 고정 카테고리 안내 */}
              <div className="mb-3 px-3 py-2 bg-gray-50 rounded-xl">
                <span className="text-xs text-gray-500">{'"전체"'} 탭은 고정이며 수정/삭제할 수 없습니다.</span>
              </div>

              {/* 카테고리 목록 */}
              <div className="space-y-2">
                {customNoticeCategories.length === 0 ? (
                  <div className="text-center py-8 text-gray-400 text-sm">
                    등록된 카테고리가 없습니다. 위에서 추가해주세요.
                  </div>
                ) : (
                  customNoticeCategories.map((cat, index) => (
                    <div key={`${cat}-${index}`} className="flex items-center gap-2 p-3 bg-rose-50/50 rounded-xl border border-rose-100">
                      {editingNoticeCatIndex === index ? (
                        <>
                          <input
                            type="text"
                            value={editingNoticeCatName}
                            onChange={(e) => setEditingNoticeCatName(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && updateCategory(index)}
                            className="flex-1 text-sm border border-rose-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-rose-300"
                            autoFocus
                          />
                          <button onClick={() => updateCategory(index)} className="text-xs px-3 py-1.5 bg-rose-400 text-white rounded-lg hover:bg-rose-500">저장</button>
                          <button onClick={() => { setEditingNoticeCatIndex(null); setEditingNoticeCatName(""); }} className="text-xs px-3 py-1.5 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300">취소</button>
                        </>
                      ) : (
                        <>
                          <span className="flex-1 text-sm font-medium text-gray-700">{cat}</span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => moveCategoryUp(index)}
                              disabled={index === 0}
                              className="p-1 rounded-lg hover:bg-rose-100 text-gray-400 hover:text-rose-500 disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              <ArrowUp className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => moveCategoryDown(index)}
                              disabled={index === customNoticeCategories.length - 1}
                              className="p-1 rounded-lg hover:bg-rose-100 text-gray-400 hover:text-rose-500 disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              <ArrowDown className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => { setEditingNoticeCatIndex(index); setEditingNoticeCatName(cat); }}
                              className="p-1 rounded-lg hover:bg-rose-100 text-gray-400 hover:text-rose-500"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => deleteCategory(index)}
                              className="p-1 rounded-lg hover:bg-rose-100 text-gray-400 hover:text-rose-500"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    )
  }

  // 오류 보고 화면 UI
  if (showErrorReport) {
    return (
      <main className="min-h-screen bg-rose-50/30">
        <div className="max-w-2xl mx-auto p-4 md:p-6">
          {/* 헤더 */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowErrorReport(false)}
                className="border-rose-200 hover:bg-rose-50"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                돌아가기
              </Button>
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">오류 보고</h1>
            </div>
            <Button
              onClick={() => setShowErrorReportModal(true)}
              className="bg-rose-400 hover:bg-rose-500 text-white"
            >
              <Plus className="h-4 w-4 mr-1" />
              오류 보고하기
            </Button>
          </div>
          
          {/* 안내 메시지 */}
          <div className="bg-white rounded-2xl shadow-sm border border-rose-100 p-4 md:p-6">
            <div className="flex items-center gap-2 text-base md:text-lg font-semibold text-gray-800 mb-4">
              <AlertTriangle className="h-5 w-5 text-rose-400" />
              오류 보고 게시판
            </div>
            
            <div className="text-center py-8 text-gray-500">
              <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-rose-300" />
              <p className="mb-2">시스템 오류를 발견하셨나요?</p>
              <p className="text-sm text-gray-400">오른쪽 상단의 &quot;오류 보고하기&quot; 버튼을 눌러 알려주세요.</p>
            </div>
          </div>
        </div>

        {/* 오류 보고 모달 */}
        {showErrorReportModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800">오류 보고 작성</h2>
                <button
                  onClick={() => setShowErrorReportModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="reporter" className="text-sm font-medium text-gray-700">보고자 이름</Label>
                  <Input
                    id="reporter"
                    value={newErrorReport.reporter}
                    onChange={(e) => setNewErrorReport({...newErrorReport, reporter: e.target.value})}
                    placeholder="이름을 입력해주세요"
                    className="mt-1 border-rose-200 focus:ring-rose-400"
                  />
                </div>
                
                <div>
                  <Label htmlFor="errorTitle" className="text-sm font-medium text-gray-700">오류 제목</Label>
                  <Input
                    id="errorTitle"
                    value={newErrorReport.title}
                    onChange={(e) => setNewErrorReport({...newErrorReport, title: e.target.value})}
                    placeholder="오류 제목을 입력해주세요"
                    className="mt-1 border-rose-200 focus:ring-rose-400"
                  />
                </div>
                
                <div>
                  <Label htmlFor="errorDescription" className="text-sm font-medium text-gray-700">오류 내용</Label>
                  <Textarea
                    id="errorDescription"
                    value={newErrorReport.description}
                    onChange={(e) => setNewErrorReport({...newErrorReport, description: e.target.value})}
                    placeholder="어떤 오류가 발생했는지 자세히 설명해주세요"
                    className="mt-1 border-rose-200 focus:ring-rose-400 min-h-[120px]"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowErrorReportModal(false)}
                  className="flex-1 border-rose-200 hover:bg-rose-50"
                >
                  취소
                </Button>
                <Button
                  onClick={() => {
                    // DB 저장 없이 임시로 알림만 표시
                    alert(`오류 보고가 접수되었습니다.\n\n보고자: ${newErrorReport.reporter}\n제목: ${newErrorReport.title}\n내용: ${newErrorReport.description}`)
                    setNewErrorReport({ title: "", description: "", reporter: "" })
                    setShowErrorReportModal(false)
                  }}
                  className="flex-1 bg-rose-400 hover:bg-rose-500 text-white"
                >
                  보고하기
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    )
  }

  // 출퇴근 보고 게시판 UI
  if (showAttendanceBoard) {
    const sortedReports = getSortedReports()
    
    return (
      <main className="min-h-screen bg-rose-50/30">
        <div className="max-w-2xl mx-auto p-4 md:p-6">
          {/* 헤더 */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAttendanceBoard(false)}
                className="border-rose-200 hover:bg-rose-50"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                돌아가기
              </Button>
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">출퇴근 보고</h1>
            </div>
            <Button
              onClick={openWriteModal}
              className="bg-rose-400 hover:bg-rose-500 text-white"
            >
              <Plus className="h-4 w-4 mr-1" />
              글쓰기
            </Button>
          </div>
          
          {/* 검색창 */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="작성자, 보고내용, 날짜 검색"
              value={attendanceSearchQuery}
              onChange={(e) => setAttendanceSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-rose-200 bg-white focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-300 text-sm placeholder-gray-400"
            />
            {attendanceSearchQuery && (
              <button
                onClick={() => setAttendanceSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          
          {/* 게시글 목록 */}
          <div className="bg-white rounded-2xl shadow-sm border border-rose-100 p-4 md:p-6">
            <div className="flex items-center gap-2 text-base md:text-lg font-semibold text-gray-800 mb-4">
              <FileText className="h-5 w-5 text-rose-400" />
              출퇴근 보고 게시판
            </div>
            
            {sortedReports.length > 0 ? (
              <div className="space-y-3">
                {sortedReports.map((report) => (
                  <div 
                    key={report.id}
                    className="p-4 rounded-xl bg-rose-50/50 border border-rose-100"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        {/* 시간 */}
                        <div className="mb-3">
                          <div className="text-xs text-gray-400 flex items-center gap-2">
                            <span>{formatDateTime(report.createdAt)}</span>
                            {report.isEdited && (
                              <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-rose-200 text-rose-400">
                                수정됨
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        {/* 보고 유형 */}
                        <div className="mb-3">
                          <Badge className={cn(
                            "text-xs",
                            report.type === "출근" 
                              ? "bg-white hover:bg-white text-gray-700 border border-gray-300" 
                              : "bg-rose-500 hover:bg-rose-500 text-white"
                          )}>
                            [{report.type} 보고]
                          </Badge>
                        </div>
                        
                        {/* 보고 내용 */}
                        <div className="space-y-1.5 text-sm">
                          <div className="flex">
                            <span className="text-gray-500 w-24 shrink-0">정1:</span>
                            <span className="text-gray-800">{report.jeong1 || "-"}</span>
                          </div>
                          <div className="flex">
                            <span className="text-gray-500 w-24 shrink-0">정2:</span>
                            <span className="text-gray-800">{report.jeong2 || "-"}</span>
                          </div>
                          <div className="flex">
                            <span className="text-gray-500 w-24 shrink-0">당일 예약:</span>
                            <span className="text-gray-800">{report.dailyReservation || "-"}</span>
                          </div>
                          <div className="flex">
                            <span className="text-gray-500 w-24 shrink-0">당일 근무 내용:</span>
                            <span className="text-gray-800">{report.dailyWork || "-"}</span>
                          </div>
                          <div className="flex">
                            <span className="text-gray-500 w-24 shrink-0">사은품 관리:</span>
                            <span className="text-gray-800">{report.giftManagement || "-"}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openEditModal(report)}
                          className="p-1.5 rounded-lg hover:bg-rose-100 text-gray-400 hover:text-rose-500 transition-colors"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(report.id)}
                          className="p-1.5 rounded-lg hover:bg-rose-100 text-gray-400 hover:text-rose-500 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                아직 작성된 글이 없습니다.
              </div>
            )}
          </div>
        </div>

        {/* 글쓰기/수정 모달 */}
        {showAttendanceModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
<h2 className="text-lg font-semibold text-gray-800">
                  {attendanceModalMode === "write" ? "출퇴근 보고 작성" : "출퇴근 보고 수정"}
                </h2>
                <button
                  onClick={() => setShowAttendanceModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                <div>
                  <Label className="text-sm font-medium text-gray-700">보고 유형</Label>
                  <div className="mt-2 flex gap-2">
                    <button
                      type="button"
                      onClick={() => setNewAttendance({...newAttendance, type: "출근"})}
                      className={cn(
                        "flex-1 py-2 px-4 rounded-lg border text-sm font-medium transition-colors",
                        newAttendance.type === "출근"
                          ? "bg-rose-400 text-white border-rose-400"
                          : "border-rose-200 text-gray-600 hover:bg-rose-50"
                      )}
                    >
                      출근
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewAttendance({...newAttendance, type: "퇴근"})}
                      className={cn(
                        "flex-1 py-2 px-4 rounded-lg border text-sm font-medium transition-colors",
                        newAttendance.type === "퇴근"
                          ? "bg-rose-400 text-white border-rose-400"
                          : "border-rose-200 text-gray-600 hover:bg-rose-50"
                      )}
                    >
                      퇴근
                    </button>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="jeong1" className="text-sm font-medium text-gray-700">정1</Label>
                  <Input
                    id="jeong1"
                    value={newAttendance.jeong1}
                    onChange={(e) => setNewAttendance({...newAttendance, jeong1: e.target.value})}
                    className="mt-1 border-rose-200 focus:ring-rose-400"
                  />
                </div>
                
                <div>
                  <Label htmlFor="jeong2" className="text-sm font-medium text-gray-700">정2</Label>
                  <Input
                    id="jeong2"
                    value={newAttendance.jeong2}
                    onChange={(e) => setNewAttendance({...newAttendance, jeong2: e.target.value})}
                    className="mt-1 border-rose-200 focus:ring-rose-400"
                  />
                </div>
                
                <div>
                  <Label htmlFor="dailyReservation" className="text-sm font-medium text-gray-700">당일 예약</Label>
                  <Input
                    id="dailyReservation"
                    value={newAttendance.dailyReservation}
                    onChange={(e) => setNewAttendance({...newAttendance, dailyReservation: e.target.value})}
                    className="mt-1 border-rose-200 focus:ring-rose-400"
                  />
                </div>
                
                <div>
                  <Label htmlFor="dailyWork" className="text-sm font-medium text-gray-700">당일 근무 내용</Label>
                  <Textarea
                    id="dailyWork"
                    value={newAttendance.dailyWork}
                    onChange={(e) => setNewAttendance({...newAttendance, dailyWork: e.target.value})}
                    className="mt-1 border-rose-200 focus:ring-rose-400 resize-none"
                    rows={2}
                  />
                </div>
                
                <div>
                  <Label htmlFor="giftManagement" className="text-sm font-medium text-gray-700">사은품 관리</Label>
                  <Textarea
                    id="giftManagement"
                    value={newAttendance.giftManagement}
                    onChange={(e) => setNewAttendance({...newAttendance, giftManagement: e.target.value})}
                    className="mt-1 border-rose-200 focus:ring-rose-400 resize-none"
                    rows={2}
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setShowAttendanceModal(false)}
                  className="flex-1 border-rose-200 hover:bg-rose-50"
                >
                  취소
                </Button>
                <Button 
                  onClick={handleSaveAttendance}
                  disabled={isSaving}
                  className="flex-1 bg-rose-400 hover:bg-rose-500 text-white disabled:opacity-50"
                >
                  {isSaving ? "저장 중..." : "저장"}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* 삭제 확인 모달 */}
        {showDeleteConfirm !== null && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">삭제 확인</h2>
              <p className="text-gray-500 mb-6">정말 삭제하시겠습니까?</p>
              
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 border-rose-200 hover:bg-rose-50"
                >
                  취소
                </Button>
                <Button 
                  onClick={() => handleDeleteReport(showDeleteConfirm!)}
                  disabled={isSaving}
                  className="flex-1 bg-rose-400 hover:bg-rose-500 text-white disabled:opacity-50"
                >
                  {isSaving ? "삭제 중..." : "삭제"}
                </Button>
              </div>
            </div>
          </div>
)}
      </main>
    )
  }

// 자료실 함수들
  const openResourceWriteModal = () => {
    setResourceModalMode("write")
    setNewResource({
      title: "",
      category: categories.length > 0 ? categories[0].name : "양식",
      description: "",
      linkUrl: ""
    })
    setUploadedFiles([])
    setUploadError(null)
    setUploadSuccess(false)
    setShowResourceModal(true)
  }
  
  const openResourceEditModal = (resource: Resource) => {
    setResourceModalMode("edit")
    setEditingResourceId(resource.id)
    setNewResource({
      title: resource.title,
      category: resource.category || (categories.length > 0 ? categories[0].name : "양식"),
      description: resource.description,
      linkUrl: resource.linkUrl
    })
    // 기존 파일 로드 (JSON 배열 또는 단일 파일 호환)
    if (resource.fileUrl) {
      try {
        const urls = JSON.parse(resource.fileUrl)
        const names = JSON.parse(resource.fileName)
        if (Array.isArray(urls)) {
          setUploadedFiles(urls.map((url: string, i: number) => ({ fileName: names[i] || `파일${i+1}`, fileUrl: url })))
        } else {
          setUploadedFiles([{ fileName: resource.fileName, fileUrl: resource.fileUrl }])
        }
      } catch {
        setUploadedFiles([{ fileName: resource.fileName, fileUrl: resource.fileUrl }])
      }
    } else {
      setUploadedFiles([])
    }
    setUploadError(null)
    setUploadSuccess(false)
    setShowResourceModal(true)
  }

// 파일 업로드 함수 (base64 변환, 다중 파일 지원)
  const handleMultiFileUpload = (files: File[]) => {
    setIsUploading(true)
    setUploadError(null)
    
    let completed = 0
    const total = files.length

    files.forEach((file) => {
      if (file.size > 10 * 1024 * 1024) {
        setUploadError(`${file.name}: 파일 크기는 10MB 이하여야 합니다.`)
        completed++
        if (completed >= total) setIsUploading(false)
        return
      }

      const reader = new FileReader()
      reader.onload = (ev) => {
        const dataUrl = ev.target?.result as string
        if (dataUrl) {
          setUploadedFiles(prev => [...prev, { fileName: file.name, fileUrl: dataUrl }])
          setUploadSuccess(true)
        }
        completed++
        if (completed >= total) setIsUploading(false)
      }
      reader.onerror = () => {
        setUploadError(`${file.name}: 파일 읽기에 실패했습니다.`)
        completed++
        if (completed >= total) setIsUploading(false)
      }
      reader.readAsDataURL(file)
    })
  }

  const handleSingleFileUpload = (file: File) => {
    handleMultiFileUpload([file])
  }

  const removeUploadedFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  const getTotalUploadSize = (): string => {
    const totalBytes = uploadedFiles.reduce((sum, f) => {
      // base64 data URL: roughly 3/4 of string length
      const base64Part = f.fileUrl.split(",")[1] || ""
      return sum + Math.round(base64Part.length * 0.75)
    }, 0)
    return formatFileSize(totalBytes)
  }

  // 카테고리 추가 함수
  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return
    
    setIsSaving(true)
    try {
      await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategoryName })
      })
      await mutateCategories()
      setNewCategoryName("")
    } catch (error) {
      console.error("Error adding category:", error)
    } finally {
      setIsSaving(false)
    }
  }

// 카테고리 삭제 함수
  const handleDeleteCategory = async (id: number) => {
    setIsSaving(true)
    try {
      await fetch(`/api/categories?id=${id}`, { method: "DELETE" })
      await mutateCategories()
    } catch (error) {
      console.error("Error deleting category:", error)
    } finally {
      setIsSaving(false)
    }
  }

  // 카테고리 순서 변경 함수
  const handleMoveCategory = async (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return
    if (direction === "down" && index === categories.length - 1) return

    const newCategories = [...categories]
    const swapIndex = direction === "up" ? index - 1 : index + 1
    ;[newCategories[index], newCategories[swapIndex]] = [newCategories[swapIndex], newCategories[index]]

    // 낙관적 업데이트
    mutateCategories(newCategories, false)

    try {
      await fetch("/api/categories", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reorder: true, categories: newCategories.map(c => c.id) })
      })
      await mutateCategories()
    } catch (error) {
      console.error("Error reordering categories:", error)
      await mutateCategories()
}
  }

  // 댓글 불러오기
  const loadComments = async (resourceId: number) => {
    setIsLoadingComments(true)
    try {
      const response = await fetch(`/api/resources/comments?resourceId=${resourceId}`)
      const data = await response.json()
      setResourceComments(data)
    } catch (error) {
      console.error("Error loading comments:", error)
    } finally {
      setIsLoadingComments(false)
    }
  }

// 자료 상세 보기
  const openResourceDetail = async (resource: Resource) => {
    setSelectedResource(resource)
    await loadComments(resource.id)
  }

  // 자료 상세 닫기
  const closeResourceDetail = () => {
    setSelectedResource(null)
    setResourceComments([])
    setNewComment({ nickname: "", content: "" })
    setEditingCommentId(null)
  }

  // 댓글 추가
  const handleAddComment = async (resourceId: number) => {
    if (!newComment.nickname.trim() || !newComment.content.trim()) return

    setIsSaving(true)
    try {
      await fetch("/api/resources/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resourceId,
          nickname: newComment.nickname,
          content: newComment.content
        })
      })
      setNewComment({ nickname: "", content: "" })
      await loadComments(resourceId)
    } catch (error) {
      console.error("Error adding comment:", error)
    } finally {
      setIsSaving(false)
    }
  }

  // 댓글 삭제
  const handleDeleteComment = async (commentId: number, resourceId: number) => {
    setIsSaving(true)
    try {
      await fetch(`/api/resources/comments?id=${commentId}`, { method: "DELETE" })
      await loadComments(resourceId)
    } catch (error) {
      console.error("Error deleting comment:", error)
    } finally {
      setIsSaving(false)
    }
  }

  // 댓글 수정
  const handleEditComment = async (commentId: number, resourceId: number) => {
    if (!editingCommentContent.trim()) return
    
    setIsSaving(true)
    try {
      await fetch("/api/resources/comments", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: commentId, content: editingCommentContent })
      })
      setEditingCommentId(null)
      setEditingCommentContent("")
      await loadComments(resourceId)
    } catch (error) {
      console.error("Error editing comment:", error)
    } finally {
      setIsSaving(false)
    }
  }

  // 카테고리 이름 수정
  const handleEditCategory = async (id: number) => {
    if (!editingCategoryName.trim()) return
    
    setIsSaving(true)
    try {
      await fetch("/api/categories", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name: editingCategoryName })
      })
      setEditingCategoryId(null)
      setEditingCategoryName("")
      await mutateCategories()
    } catch (error) {
      console.error("Error editing category:", error)
} finally {
      setIsSaving(false)
    }
  }

// 보험사 함수들
const openInsuranceWriteModal = () => {
  setInsuranceModalMode("write")
  setNewInsurance({
  name: "",
  category: "손해보험",
  logoUrl: "",
  homepageUrl: "",
  customerService: "",
  fax: "",
      address: "",
      branchManagerName: "",
      branchManagerPhone: "",
      computerSystemUrl: "",
      incallMonitoring: "",
      claimFax: "",
      claimFormUrl: "",
      termsUrl: "",
      helpdesk: "",
      dentalFormUrl: "",
      memo: ""
    })
    setShowInsuranceModal(true)
  }

const openInsuranceEditModal = (company: InsuranceCompany) => {
  setInsuranceModalMode("edit")
  setEditingInsuranceId(company.id)
  setNewInsurance({
  name: company.name,
  category: company.category,
  logoUrl: company.logoUrl || "",
  homepageUrl: company.homepageUrl || "",
  customerService: company.customerService || "",
  fax: company.fax || "",
      address: company.address || "",
      branchManagerName: company.branchManagerName || "",
      branchManagerPhone: company.branchManagerPhone || "",
      computerSystemUrl: company.computerSystemUrl || "",
      incallMonitoring: company.incallMonitoring || "",
      claimFax: company.claimFax || "",
      claimFormUrl: company.claimFormUrl || "",
      termsUrl: company.termsUrl || "",
      helpdesk: company.helpdesk || "",
      dentalFormUrl: company.dentalFormUrl || "",
      memo: company.memo || ""
    })
    setShowInsuranceModal(true)
  }

// 로고 파일 업로드 함수
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploadingLogo(true)

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("insuranceId", editingInsuranceId?.toString() || "new")

      const response = await fetch("/api/insurance/upload-logo", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        console.error("[v0] Logo upload failed:", data.error)
        return
      }

      setNewInsurance({ ...newInsurance, logoUrl: data.url })
    } catch (error) {
      console.error("[v0] Logo upload error:", error)
    } finally {
      setIsUploadingLogo(false)
      e.target.value = ""
    }
  }

const handleSaveInsurance = async () => {
  if (!newInsurance.name.trim()) return
  
  setIsSaving(true)
  try {
    let response;
    if (insuranceModalMode === "write") {
      response = await fetch("/api/insurance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newInsurance)
      })
    } else {
      response = await fetch("/api/insurance", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingInsuranceId, ...newInsurance })
      })
    }
    
    const result = await response.json()
    
    if (!response.ok) {
      console.error("Save failed:", result.error)
      alert("저장 실패: " + (result.error || "알 수 없는 오류"))
      return
    }
    
    await mutateInsurance()
    setShowInsuranceModal(false)
  } catch (error) {
    console.error("Error saving insurance:", error)
    alert("저장 중 오류가 발생했습니다.")
  } finally {
    setIsSaving(false)
  }
}

const handleDeleteInsurance = async (id: number) => {
  setIsSaving(true)
  try {
  await fetch(`/api/insurance?id=${id}`, { method: "DELETE" })
  await mutateInsurance()
  setSelectedInsurance(null)
  setShowInsuranceDeleteConfirm(null)
  } catch (error) {
  console.error("Error deleting insurance:", error)
  } finally {
  setIsSaving(false)
  }
  }

// 설계매니저 함수들
  const handleAddManager = async (companyId: number) => {
  if (!newManager.name.trim() || !newManager.phone.trim()) return
  
  setIsSaving(true)
  try {
    const response = await fetch("/api/insurance/managers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ companyId, ...newManager })
    })
    
    const result = await response.json()
    
    if (!response.ok) {
      console.error("Add manager failed:", result.error)
      alert("설계매니저 추가 실패: " + (result.error || "알 수 없는 오류"))
      return
    }
    
    await mutateInsurance()
    setNewManager({ name: "", phone: "", kakaoUrl: "" })
    setShowManagerModal(false)
  } catch (error) {
    console.error("Error adding manager:", error)
          alert("설계매니저 추가 중 오류가 발생했습니다.")
  } finally {
      setIsSaving(false)
    }
  }

const handleDeleteManager = async (id: number) => {
  setIsSaving(true)
  try {
    const response = await fetch(`/api/insurance/managers?id=${id}`, { method: "DELETE" })
    const result = await response.json()
    
    if (!response.ok) {
      console.error("Delete manager failed:", result.error)
      alert("설계매니저 삭제 실패: " + (result.error || "알 수 없는 오류"))
      return
    }
    
    await mutateInsurance()
  } catch (error) {
    console.error("Error deleting manager:", error)
    alert("설계매니저 삭제 중 오류가 발생했습니다.")
  } finally {
    setIsSaving(false)
  }
}

const handleEditManager = async () => {
  if (!editingManagerId || !newManager.name.trim() || !newManager.phone.trim()) return
  
  setIsSaving(true)
  try {
    const response = await fetch("/api/insurance/managers", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editingManagerId,
        name: newManager.name,
        phone: newManager.phone
      })
    })
    
    const result = await response.json()
    
    if (!response.ok) {
      console.error("Edit manager failed:", result.error)
      alert("설계매니저 수정 실패: " + (result.error || "알 수 없는 오류"))
      return
    }
    
    await mutateInsurance()
    setNewManager({ name: "", phone: "", kakaoUrl: "" })
    setEditingManagerId(null)
    setShowManagerModal(false)
  } catch (error) {
    console.error("Error editing manager:", error)
    alert("설계매니저 수정 중 오류가 발생했습니다.")
  } finally {
    setIsSaving(false)
  }
}

const openEditManagerModal = (manager: InsuranceManager, insurance: InsuranceCompany) => {
  setSelectedInsurance(insurance)
  setEditingManagerId(manager.id)
  setNewManager({ name: manager.name, phone: manager.phone, kakaoUrl: manager.kakaoUrl || "" })
  setShowManagerModal(true)
  }
  
// 담당자 함수들 (지점장/부지점장/교육매니저 통합)
  const handleAddBranchManager = async (companyId: number) => {
  if (!newBranchManager.name.trim()) return
  
  setIsSaving(true)
  try {
  // 교육매니저는 별도 테이블에 저장
  if (newBranchManager.role === "education_manager") {
    const response = await fetch("/api/insurance/education-managers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ companyId, name: newBranchManager.name, phone: newBranchManager.phone })
    })
    
    const result = await response.json()
    
    if (!response.ok) {
      alert("교육매니저 추가 실패: " + (result.error || "알 수 없는 오류"))
      return
    }
  } else {
    const response = await fetch("/api/insurance/branch-managers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ companyId, name: newBranchManager.name, phone: newBranchManager.phone, role: newBranchManager.role })
    })
    
    const result = await response.json()
    
    if (!response.ok) {
      alert("담당자 추가 실패: " + (result.error || "알 수 없는 오류"))
      return
    }
  }
  
  await mutateInsurance()
  setNewBranchManager({ name: "", phone: "", kakaoUrl: "", role: "branch_manager" })
  setShowBranchManagerModal(false)
  } catch (error) {
  console.error("Error adding contact:", error)
  alert("담당자 추가 중 오류가 발생했습니다.")
  } finally {
  setIsSaving(false)
  }
  }
  
  const handleEditBranchManager = async () => {
    if (!editingBranchManagerId || !newBranchManager.name.trim()) return
    
    setIsSaving(true)
    try {
      const response = await fetch("/api/insurance/branch-managers", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingBranchManagerId,
          name: newBranchManager.name,
          phone: newBranchManager.phone,
          role: newBranchManager.role
        })
      })
      
      const result = await response.json()
      
      if (!response.ok) {
        alert("지점장 수정 실패: " + (result.error || "알 수 없는 오류"))
        return
      }
      
      await mutateInsurance()
      setNewBranchManager({ name: "", phone: "", kakaoUrl: "", role: "branch_manager" })
      setEditingBranchManagerId(null)
      setShowBranchManagerModal(false)
    } catch (error) {
      console.error("Error editing branch manager:", error)
      alert("지점장 수정 중 오류가 발생했습니다.")
    } finally {
      setIsSaving(false)
    }
  }
  
  const handleDeleteBranchManager = async (id: number) => {
    setIsSaving(true)
    try {
      const response = await fetch(`/api/insurance/branch-managers?id=${id}`, { method: "DELETE" })
      const result = await response.json()
      
      if (!response.ok) {
        alert("지점장 삭제 실패: " + (result.error || "알 수 없는 오류"))
        return
      }
      
      await mutateInsurance()
    } catch (error) {
      console.error("Error deleting branch manager:", error)
      alert("지점장 삭제 중 오류가 발생했습니다.")
    } finally {
      setIsSaving(false)
    }
  }
  
const openEditBranchManagerModal = (bm: BranchManager, insurance: InsuranceCompany) => {
  setSelectedInsurance(insurance)
  setEditingBranchManagerId(bm.id)
  setNewBranchManager({ name: bm.name, phone: bm.phone, kakaoUrl: bm.kakaoUrl || "", role: bm.role })
  setShowBranchManagerModal(true)
  }
  
  // 교육매니저 함수들
  const handleAddEducationManager = async (companyId: number) => {
    if (!newEducationManager.name.trim()) return
    
    setIsSaving(true)
    try {
      const response = await fetch("/api/insurance/education-managers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyId, ...newEducationManager })
      })
      
      const result = await response.json()
      
      if (!response.ok) {
          alert("교육매니저 추가 실패: " + (result.error || "알 수 없는 오류"))
        return
      }
      
      await mutateInsurance()
      setNewEducationManager({ name: "", phone: "" })
      setShowEducationManagerModal(false)
    } catch (error) {
      console.error("Error adding education manager:", error)
      alert("교육매니저 추가 중 오류가 발생했습니다.")
    } finally {
      setIsSaving(false)
    }
  }
  
  const handleEditEducationManager = async () => {
    if (!editingEducationManagerId || !newEducationManager.name.trim()) return
    
    setIsSaving(true)
    try {
      const response = await fetch("/api/insurance/education-managers", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingEducationManagerId,
          name: newEducationManager.name,
          phone: newEducationManager.phone
        })
      })
      
      const result = await response.json()
      
      if (!response.ok) {
        alert("교육매니저 수정 실패: " + (result.error || "알 수 없는 오류"))
        return
      }
      
      await mutateInsurance()
      setNewEducationManager({ name: "", phone: "" })
      setEditingEducationManagerId(null)
      setShowEducationManagerModal(false)
    } catch (error) {
      console.error("Error editing education manager:", error)
      alert("교육매니저 수정 중 오류가 발생했습니다.")
    } finally {
      setIsSaving(false)
    }
  }
  
  const handleDeleteEducationManager = async (id: number) => {
    setIsSaving(true)
    try {
      const response = await fetch(`/api/insurance/education-managers?id=${id}`, { method: "DELETE" })
      const result = await response.json()
      
      if (!response.ok) {
        alert("교육매니저 삭제 실패: " + (result.error || "알 수 없는 오류"))
        return
      }
      
      await mutateInsurance()
    } catch (error) {
      console.error("Error deleting education manager:", error)
      alert("교육매니저 삭제 중 오류가 발생했습니다.")
    } finally {
      setIsSaving(false)
    }
  }
  
  const openEditEducationManagerModal = (em: EducationManager, insurance: InsuranceCompany) => {
    setSelectedInsurance(insurance)
    setEditingEducationManagerId(em.id)
    setNewEducationManager({ name: em.name, phone: em.phone })
    // 통합 모달 사용 - 별도 모달 대신 담당자 모달에서 수정
    setShowEducationManagerModal(true)
  }
  
  const handleSaveResource = async () => {
    if (!newResource.title.trim()) return
    
    // 다중 파일을 JSON 배열로 저장
    const fileUrls = uploadedFiles.map(f => f.fileUrl)
    const fileNames = uploadedFiles.map(f => f.fileName)
    
    const resourceData = {
      ...newResource,
      fileUrl: fileUrls.length > 0 ? JSON.stringify(fileUrls) : "",
      fileName: fileNames.length > 0 ? JSON.stringify(fileNames) : ""
    }
    
    setIsSaving(true)
    try {
      if (resourceModalMode === "write") {
        await fetch("/api/resources", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(resourceData)
        })
      } else if (resourceModalMode === "edit" && editingResourceId) {
        await fetch("/api/resources", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingResourceId, ...resourceData })
        })
      }
      
      await mutateResources()
      setShowResourceModal(false)
      setNewResource({ title: "", category: categories.length > 0 ? categories[0].name : "양식", description: "", linkUrl: "" })
      setUploadedFiles([])
      setEditingResourceId(null)
    } catch (error) {
      console.error("Error saving resource:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteResource = async (id: number) => {
    setIsSaving(true)
    try {
      await fetch(`/api/resources?id=${id}`, { method: "DELETE" })
      await mutateResources()
      setShowResourceDeleteConfirm(null)
    } catch (error) {
      console.error("Error deleting resource:", error)
} finally {
      setIsSaving(false)
    }
  }

  // 보험사 연락처 목록 페이지
  if (showInsurance) {
    // 카테고리별 보험사 그룹화
    const groupedInsurance = {
      손해보험: filteredInsurance.filter(c => c.category === "손해보험"),
      생명보험: filteredInsurance.filter(c => c.category === "생명보험"),
      공제보험: filteredInsurance.filter(c => c.category === "공제보험"),
      기타보험: filteredInsurance.filter(c => c.category === "기타보험")
    }

    return (
      <main className="min-h-screen bg-[#fff7f9]">
        <div className="max-w-6xl mx-auto p-4 md:p-6">
          {/* 뒤로가기 */}
          <div className="mb-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowInsurance(false)}
              className="border-rose-200 hover:bg-rose-50 text-gray-600"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              돌아가기
            </Button>
          </div>

          {/* 제목 */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2">
              <Phone className="h-6 w-6 text-[#ff6b8a]" />
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                {insuranceViewMode === "연락처" ? "보험사 연락처" : "원수사 연락망"}
              </h1>
            </div>
          </div>

          {/* 검색창 */}
          <div className="max-w-xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder={insuranceViewMode === "연락처" ? "보험사명 검색" : "보험사명, 지점장, 매니저 검색"}
                value={insuranceSearch}
                onChange={(e) => setInsuranceSearch(e.target.value)}
                className="pl-12 py-5 text-base bg-white border-rose-100 focus:ring-[#ff8fa3] focus:border-[#ff8fa3] rounded-xl shadow-sm"
              />
            </div>
          </div>

          {/* 카테고리 탭 */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-1 bg-white rounded-full p-1.5 shadow-sm border border-rose-100">
              {insuranceCategories
                .filter(cat => cat !== "전체")
                .filter(cat => insuranceViewMode === "원수사" ? (cat === "손해보험" || cat === "생명보험") : true)
                .map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedInsuranceCategory(cat)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                    selectedInsuranceCategory === cat
                      ? "bg-[#ff8fa3] text-white"
                      : "text-gray-500 hover:text-gray-700 hover:bg-rose-50"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 추가 버튼 - admin만 */}
          {isAdmin && (
          <div className="flex justify-end mb-4">
            <Button
              onClick={openInsuranceWriteModal}
              className="bg-[#ff6b8a] hover:bg-[#ff5577] text-white shadow-sm"
            >
              <Plus className="h-4 w-4 mr-1" />
              {insuranceViewMode === "연락처" ? "보험사 추가" : "연락망 추가"}
            </Button>
          </div>
          )}

              {/* === 보험사 연락처 뷰 - 로고 그리드 + 팝업 구조 === */}
          {insuranceViewMode === "연락처" && (
            <>
              {/* 손해보험 섹션 */}
              {(selectedInsuranceCategory === "전체" || selectedInsuranceCategory === "손해보험") && groupedInsurance.손해보험.length > 0 && (
                <div className="mb-10">
                  <h2 className="text-xl md:text-2xl font-bold text-center text-[#ff6b8a] mb-6">손해보험사</h2>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-4">
                    {groupedInsurance.손해보험.map((company) => (
                      <div
                        key={company.id}
                        onClick={() => openInsuranceDetail(company)}
                        className="bg-white rounded-xl border border-gray-200 aspect-square flex items-center justify-center p-4 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200 relative group"
                      >
                        {company.logoUrl ? (
                          <img 
                            src={company.logoUrl} 
                            alt={company.name}
                            className="max-h-full max-w-full object-contain"
                          />
                        ) : (
                          <span className="text-sm font-bold text-gray-700 text-center leading-tight">{company.name}</span>
                        )}
                        {/* 관리자 버튼 - hover 시 표시 */}
                        {isAdmin && (
                          <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                openInsuranceEditModal(company)
                              }}
                              className="p-1 rounded bg-white/90 shadow text-gray-400 hover:text-[#ff6b8a]"
                            >
                              <Pencil className="h-3 w-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 생명보험 섹션 */}
              {(selectedInsuranceCategory === "전체" || selectedInsuranceCategory === "생명보험") && groupedInsurance.생명보험.length > 0 && (
                <div className="mb-10">
                  <h2 className="text-xl md:text-2xl font-bold text-center text-[#ff8fa3] mb-6">생명보험사</h2>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-4">
                    {groupedInsurance.생명보험.map((company) => (
                      <div
                        key={company.id}
                        onClick={() => openInsuranceDetail(company)}
                        className="bg-white rounded-xl border border-gray-200 aspect-square flex items-center justify-center p-4 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200 relative group"
                      >
                        {company.logoUrl ? (
                          <img src={company.logoUrl} alt={company.name} className="max-h-full max-w-full object-contain" />
                        ) : (
                          <span className="text-sm font-bold text-gray-700 text-center leading-tight">{company.name}</span>
                        )}
                        {isAdmin && (
                          <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                openInsuranceEditModal(company)
                              }}
                              className="p-1 rounded bg-white/90 shadow text-gray-400 hover:text-[#ff6b8a]"
                            >
                              <Pencil className="h-3 w-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 공제보험 섹션 */}
              {(selectedInsuranceCategory === "전체" || selectedInsuranceCategory === "공제보험") && groupedInsurance.공제보험.length > 0 && (
                <div className="mb-10">
                  <h2 className="text-xl md:text-2xl font-bold text-center text-[#ff6b8a] mb-6">공제조합</h2>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-4">
                    {groupedInsurance.공제보험.map((company) => (
                      <div
                        key={company.id}
                        onClick={() => openInsuranceDetail(company)}
                        className="bg-white rounded-xl border border-gray-200 aspect-square flex items-center justify-center p-4 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200 relative group"
                      >
                        {company.logoUrl ? (
                          <img src={company.logoUrl} alt={company.name} className="max-h-full max-w-full object-contain" />
                        ) : (
                          <span className="text-sm font-bold text-gray-700 text-center leading-tight">{company.name}</span>
                        )}
                        {isAdmin && (
                          <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                openInsuranceEditModal(company)
                              }}
                              className="p-1 rounded bg-white/90 shadow text-gray-400 hover:text-[#ff6b8a]"
                            >
                              <Pencil className="h-3 w-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 기타보험 섹션 */}
              {(selectedInsuranceCategory === "전체" || selectedInsuranceCategory === "기타보험") && groupedInsurance.기타보험.length > 0 && (
                <div className="mb-10">
                  <h2 className="text-xl md:text-2xl font-bold text-center text-gray-600 mb-6">기타보험</h2>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-4">
                    {groupedInsurance.기타보험.map((company) => (
                      <div
                        key={company.id}
                        onClick={() => openInsuranceDetail(company)}
                        className="bg-white rounded-xl border border-gray-200 aspect-square flex items-center justify-center p-4 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200 relative group"
                      >
                        {company.logoUrl ? (
                          <img src={company.logoUrl} alt={company.name} className="max-h-full max-w-full object-contain" />
                        ) : (
                          <span className="text-sm font-bold text-gray-700 text-center leading-tight">{company.name}</span>
                        )}
                        {isAdmin && (
                          <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                openInsuranceEditModal(company)
                              }}
                              className="p-1 rounded bg-white/90 shadow text-gray-400 hover:text-[#ff6b8a]"
                            >
                              <Pencil className="h-3 w-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* === 원수사 연락망 뷰 - 카드형 (담당자 연락처 관리용) === */}
          {insuranceViewMode === "원수사" && (
            <>
              {filteredInsurance.filter(c => c.category === "손해보험" || c.category === "생명보험").length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredInsurance.filter(c => c.category === "손해보험" || c.category === "생명보험").map((company) => (
                    <div
                      key={company.id}
                      className="bg-white rounded-2xl border border-rose-100 shadow-sm hover:shadow-md transition-all overflow-hidden"
                    >
                      {/* 로고/이름 영역 */}
                      <div className="p-4 border-b border-rose-50 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {company.logoUrl ? (
                            <img 
                              src={company.logoUrl} 
                              alt={company.name}
                              className="h-8 w-auto max-w-[100px] object-contain"
                            />
                          ) : (
                            <span className="text-lg font-bold text-gray-800">{company.name}</span>
                          )}
                        </div>
                        {isAdmin && (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => openInsuranceEditModal(company)}
                              className="p-2 rounded-lg hover:bg-rose-50 text-gray-400 hover:text-[#ff6b8a]"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => setShowInsuranceDeleteConfirm(company.id)}
                              className="p-2 rounded-lg hover:bg-rose-50 text-gray-400 hover:text-rose-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* 삭제 확인 */}
                      {showInsuranceDeleteConfirm === company.id && (
                        <div className="mx-4 mt-3 p-3 bg-rose-50 rounded-xl border border-rose-200">
                          <p className="text-sm text-gray-700 mb-3">정말 삭제하시겠습니까?</p>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setShowInsuranceDeleteConfirm(null)}
                              className="flex-1 border-gray-200"
                            >
                              취소
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleDeleteInsurance(company.id)}
                              disabled={isSaving}
                              className="flex-1 bg-rose-500 hover:bg-rose-600 text-white"
                            >
                              {isSaving ? "삭제 중..." : "삭제"}
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* 지점장/부지점장/교육매니저 섹션 */}
                      <div className="px-4 py-3 border-b border-rose-50">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium text-gray-700">지점장 / 부지점장 / 교육매니저</p>
                          {isAdmin && (
                            <button
                              onClick={() => openBranchManagerAddModal(company)}
                              className="text-xs text-[#ff6b8a] hover:text-[#ff5577] font-medium"
                            >
                              + 추가
                            </button>
                          )}
                        </div>
                        {((company.branchManagers && company.branchManagers.length > 0) || 
                          (company.educationManagers && company.educationManagers.length > 0)) ? (
                          <div className="space-y-2">
                            {/* 지점장 */}
                            {company.branchManagers?.filter(bm => bm.role === 'branch_manager').map((bm) => (
                              <div key={`bm-${bm.id}`} className="p-3 bg-[#ffe5eb] rounded-xl">
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex-1 min-w-0">
                                    <span className="text-xs text-[#ff6b8a]">지점장</span>
                                    <p className="font-bold text-gray-800 mt-0.5 break-words">{bm.name}</p>
                                    {bm.phone && <p className="text-sm text-gray-600 mt-0.5 text-center">{bm.phone}</p>}
                                  </div>
                                  {isAdmin && (
                                    <div className="flex items-center gap-1 shrink-0">
                                      <button onClick={() => openEditBranchManagerModal(bm, company)} className="p-1.5 rounded-lg hover:bg-rose-100 text-gray-400 hover:text-[#ff6b8a]">
                                        <Pencil className="h-3.5 w-3.5" />
                                      </button>
                                      <button onClick={() => handleDeleteBranchManager(bm.id)} className="p-1.5 rounded-lg hover:bg-rose-100 text-gray-400 hover:text-rose-500">
                                        <X className="h-3.5 w-3.5" />
                                      </button>
                                    </div>
                                  )}
                                </div>
                                {/* 연락 버튼들 */}
                                {bm.phone && (
                                  <div className="grid grid-cols-2 gap-1.5 mt-3">
                                    <a 
                                      href={`tel:${bm.phone}`}
                                      className="py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-xs font-medium flex items-center justify-center gap-1 transition-colors"
                                    >
                                      💙 갤럭시 저장
                                    </a>
                                    <button 
                                      type="button"
                                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); downloadVCard(bm.name, "지점장", company.name, bm.phone); }}
                                      className="py-2 bg-[#ff6b8a] hover:bg-[#ff5577] text-white rounded-lg text-xs font-medium flex items-center justify-center gap-1 transition-colors"
                                    >
                                      🍎 아이폰 저장
                                    </button>
                                  </div>
                                )}
                              </div>
                            ))}
                            {/* 부지점장 */}
                            {company.branchManagers?.filter(bm => bm.role === 'assistant_branch_manager').map((bm) => (
                              <div key={`abm-${bm.id}`} className="p-3 bg-violet-50 rounded-xl">
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex-1 min-w-0">
                                    <span className="text-xs text-violet-500">부지점장</span>
                                    <p className="font-bold text-gray-800 mt-0.5 break-words">{bm.name}</p>
                                    {bm.phone && <p className="text-sm text-gray-600 mt-0.5 text-center">{bm.phone}</p>}
                                  </div>
                                  {isAdmin && (
                                    <div className="flex items-center gap-1 shrink-0">
                                      <button onClick={() => openEditBranchManagerModal(bm, company)} className="p-1.5 rounded-lg hover:bg-violet-100 text-gray-400 hover:text-violet-500">
                                        <Pencil className="h-3.5 w-3.5" />
                                      </button>
                                      <button onClick={() => handleDeleteBranchManager(bm.id)} className="p-1.5 rounded-lg hover:bg-violet-100 text-gray-400 hover:text-rose-500">
                                        <X className="h-3.5 w-3.5" />
                                      </button>
                                    </div>
                                  )}
                                </div>
                                {/* 연락 버튼들 */}
                                {bm.phone && (
                                  <div className="grid grid-cols-2 gap-1.5 mt-3">
                                    <a 
                                      href={`tel:${bm.phone}`}
                                      className="py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-xs font-medium flex items-center justify-center gap-1 transition-colors"
                                    >
                                      💙 갤럭시 저장
                                    </a>
                                    <button 
                                      type="button"
                                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); downloadVCard(bm.name, "부지점장", company.name, bm.phone); }}
                                      className="py-2 bg-violet-400 hover:bg-violet-500 text-white rounded-lg text-xs font-medium flex items-center justify-center gap-1 transition-colors"
                                    >
                                      🍎 아이폰 저장
                                    </button>
                                  </div>
                                )}
                              </div>
                            ))}
                            {/* 교육매니저 */}
                            {company.educationManagers?.map((em) => (
                              <div key={`em-${em.id}`} className="p-3 bg-emerald-50 rounded-xl">
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex-1 min-w-0">
                                    <span className="text-xs text-emerald-500">교육매니저</span>
                                    <p className="font-bold text-gray-800 mt-0.5 break-words">{em.name}</p>
                                    {em.phone && <p className="text-sm text-gray-600 mt-0.5 text-center">{em.phone}</p>}
                                  </div>
                                  {isAdmin && (
                                    <div className="flex items-center gap-1 shrink-0">
                                      <button onClick={() => openEditEducationManagerModal(em, company)} className="p-1.5 rounded-lg hover:bg-emerald-100 text-gray-400 hover:text-emerald-500">
                                        <Pencil className="h-3.5 w-3.5" />
                                      </button>
                                      <button onClick={() => handleDeleteEducationManager(em.id)} className="p-1.5 rounded-lg hover:bg-emerald-100 text-gray-400 hover:text-rose-500">
                                        <X className="h-3.5 w-3.5" />
                                      </button>
                                    </div>
                                  )}
                                </div>
                                {/* 연락 버튼들 */}
                                {em.phone && (
                                  <div className="grid grid-cols-2 gap-1.5 mt-3">
                                    <a 
                                      href={`tel:${em.phone}`}
                                      className="py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-xs font-medium flex items-center justify-center gap-1 transition-colors"
                                    >
                                      💙 갤럭시 저장
                                    </a>
                                    <button 
                                      type="button"
                                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); downloadVCard(em.name, "교육매니저", company.name, em.phone); }}
                                      className="py-2 bg-emerald-400 hover:bg-emerald-500 text-white rounded-lg text-xs font-medium flex items-center justify-center gap-1 transition-colors"
                                    >
                                      🍎 아이폰 저장
                                    </button>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-3 text-gray-400 text-sm bg-gray-50 rounded-xl">
                            등록된 담당자가 없습니다
                          </div>
                        )}
                      </div>

                      {/* 설계매니저 목록 */}
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-sm font-medium text-gray-700">설계매니저</p>
                          {isAdmin && (
                            <button
                              onClick={() => openManagerAddModal(company)}
                              className="text-xs text-[#ff6b8a] hover:text-[#ff5577] font-medium"
                            >
                              + 추가
                            </button>
                          )}
                        </div>
                        {company.managers.length > 0 ? (
                          <div className="space-y-2">
                            {company.managers.map((manager) => (
                              <div key={manager.id} className="p-3 bg-gray-50 rounded-xl">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <span className="text-xs text-[#ff8fa3]">설계매니저</span>
                                    <p className="font-bold text-gray-800 mt-0.5">{manager.name}</p>
                                    {manager.phone && <p className="text-sm text-gray-600 mt-0.5">{manager.phone}</p>}
                                  </div>
                                  {isAdmin && (
                                    <div className="flex items-center gap-1">
                                      <button
                                        onClick={() => openEditManagerModal(manager, company)}
                                        className="p-1.5 rounded-lg hover:bg-rose-100 text-gray-400 hover:text-[#ff6b8a]"
                                      >
                                        <Pencil className="h-3.5 w-3.5" />
                                      </button>
                                      <button
                                        onClick={() => handleDeleteManager(manager.id)}
                                        className="p-1.5 rounded-lg hover:bg-rose-100 text-gray-400 hover:text-rose-500"
                                      >
                                        <X className="h-3.5 w-3.5" />
                                      </button>
                                    </div>
                                  )}
                                </div>
                                {/* 연락 버튼들 */}
                                {manager.phone && (
                                  <div className="grid grid-cols-2 gap-1.5 mt-3">
                                    <a 
                                      href={`tel:${manager.phone}`}
                                      className="py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-xs font-medium flex items-center justify-center gap-1 transition-colors"
                                    >
                                      💙 갤럭시 저장
                                    </a>
                                    <button 
                                      type="button"
                                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); downloadVCard(manager.name, "설계매니저", company.name, manager.phone); }}
                                      className="py-2 bg-[#ff8fa3] hover:bg-[#ff6b8a] text-white rounded-lg text-xs font-medium flex items-center justify-center gap-1 transition-colors"
                                    >
                                      🍎 아이폰 저장
                                    </button>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-3 text-gray-400 text-sm bg-gray-50 rounded-xl">
                            등록된 설계매니저가 없습니다
                          </div>
                        )}
                      </div>

                      {/* 메모 */}
                      {company.memo && (
                        <div className="mx-4 mb-3 p-3 bg-amber-50 rounded-xl">
                          <p className="text-xs text-amber-600 mb-1">메모</p>
                          <p className="text-sm text-gray-700 whitespace-pre-wrap">{company.memo}</p>
                        </div>
                      )}

                      {/* 최종 수정일 */}
                      {company.updatedAt && (
                        <div className="px-4 pb-4 text-xs text-gray-400 text-right">
                          최종 수정: {new Date(company.updatedAt).toLocaleDateString('ko-KR')}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 text-gray-400">
                  {insuranceSearch ? "검색 결과가 없습니다." : "등록된 보험사가 없습니다."}
                </div>
              )}
            </>
          )}

          {/* 검색 결과 없음 - 연락처 뷰 */}
          {insuranceViewMode === "연락처" && filteredInsurance.length === 0 && (
            <div className="text-center py-16 text-gray-400">
                    {insuranceSearch ? "검색 결과가 없습니다." : "등록된 보험사가 없습니다."}
            </div>
          )}
        </div>

        {/* 보험사 추가/수정 모달 */}
        {showInsuranceModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800">
                  {insuranceViewMode === "연락처" 
                    ? (insuranceModalMode === "write" ? "보험사 연락처 추가" : "보험사 연락처 수정")
                    : (insuranceModalMode === "write" ? "원수사 연락망 추가" : "원수사 연락망 수정")
                  }
                </h2>
                <button 
                  onClick={() => setShowInsuranceModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                {/* 기본 정보 */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label className="text-sm font-medium text-gray-700">보험사명 *</Label>
                    <Input
                      placeholder="보험사 이름"
                      value={newInsurance.name}
                      onChange={(e) => setNewInsurance({...newInsurance, name: e.target.value})}
                      className="mt-1 border-rose-200 focus:ring-[#ff8fa3] focus:border-[#ff8fa3]"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm font-medium text-gray-700">로고</Label>
                    <div className="mt-2">
                      <FileUploadBox
                        accept="image"
                        isUploading={isUploadingLogo}
                        previewUrl={newInsurance.logoUrl || null}
                        onFileSelect={(file) => {
                          setIsUploadingLogo(true)
                          const reader = new FileReader()
                          reader.onload = (ev) => {
                            const dataUrl = ev.target?.result as string
                            if (dataUrl) {
                              // 이미지 리사이징 (최대 200x200, JPEG 품질 0.7)
                              const img = new window.Image()
                              img.crossOrigin = "anonymous"
                              img.onload = () => {
                                const maxSize = 200
                                let w = img.width
                                let h = img.height
                                if (w > maxSize || h > maxSize) {
                                  if (w > h) { h = Math.round(h * maxSize / w); w = maxSize }
                                  else { w = Math.round(w * maxSize / h); h = maxSize }
                                }
                                const canvas = document.createElement("canvas")
                                canvas.width = w
                                canvas.height = h
                                const ctx = canvas.getContext("2d")
                                ctx?.drawImage(img, 0, 0, w, h)
                                const compressed = canvas.toDataURL("image/jpeg", 0.7)
                                setNewInsurance(prev => ({...prev, logoUrl: compressed}))
                                setIsUploadingLogo(false)
                              }
                              img.onerror = () => {
                                setNewInsurance(prev => ({...prev, logoUrl: dataUrl}))
                                setIsUploadingLogo(false)
                              }
                              img.src = dataUrl
                            } else {
                              setIsUploadingLogo(false)
                            }
                          }
                          reader.onerror = () => {
                            setIsUploadingLogo(false)
                          }
                          reader.readAsDataURL(file)
                        }}
                        onRemove={() => setNewInsurance({...newInsurance, logoUrl: ""})}
                      />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm font-medium text-gray-700">구분</Label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {(insuranceViewMode === "원수사" 
                        ? ["손해보험", "생명보험"] 
                        : ["손해보험", "생명보험", "공제보험", "기타보험"]
                      ).map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setNewInsurance({...newInsurance, category: cat})}
                          className={cn(
                            "px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors",
                            newInsurance.category === cat
                              ? "bg-[#ff6b8a] text-white border-[#ff6b8a]"
                              : "border-rose-200 text-gray-600 hover:bg-rose-50"
                          )}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 연락처 정보 - 보험사 연락처 모드에서만 표시 */}
                {insuranceViewMode === "연락처" && (
                <>
                <div className="pt-4 border-t border-rose-100">
                  <p className="text-sm font-medium text-gray-700 mb-3">연락처 정보</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs text-gray-500">고객센터</Label>
                      <Input
                        placeholder="1588-0000"
                        value={newInsurance.customerService}
                        onChange={(e) => setNewInsurance({...newInsurance, customerService: e.target.value})}
                        className="mt-1 border-rose-200 focus:ring-[#ff8fa3] focus:border-[#ff8fa3]"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">보험금청구 FAX</Label>
                      <Input
                        placeholder="0505-000-0000"
                        value={newInsurance.claimFax}
                        onChange={(e) => setNewInsurance({...newInsurance, claimFax: e.target.value})}
                        className="mt-1 border-rose-200 focus:ring-[#ff8fa3] focus:border-[#ff8fa3]"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label className="text-xs text-gray-500">청구 주소</Label>
                      <Input
                        placeholder="청구서 발송 주소"
                        value={newInsurance.address}
                        onChange={(e) => setNewInsurance({...newInsurance, address: e.target.value})}
                        className="mt-1 border-rose-200 focus:ring-[#ff8fa3] focus:border-[#ff8fa3]"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">보험회사 전산</Label>
                      <Input
                        placeholder="전화번호 또는 URL"
                        value={newInsurance.computerSystemUrl}
                        onChange={(e) => setNewInsurance({...newInsurance, computerSystemUrl: e.target.value})}
                        className="mt-1 border-rose-200 focus:ring-[#ff8fa3] focus:border-[#ff8fa3]"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">동의서 FAX</Label>
                      <Input
                        placeholder="02-0000-0000"
                        value={newInsurance.fax}
                        onChange={(e) => setNewInsurance({...newInsurance, fax: e.target.value})}
                        className="mt-1 border-rose-200 focus:ring-[#ff8fa3] focus:border-[#ff8fa3]"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">인콜모니터링</Label>
                      <Input
                        placeholder="1566-0000"
                        value={newInsurance.incallMonitoring}
                        onChange={(e) => setNewInsurance({...newInsurance, incallMonitoring: e.target.value})}
                        className="mt-1 border-rose-200 focus:ring-[#ff8fa3] focus:border-[#ff8fa3]"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">전산 헬프데스크</Label>
                      <Input
                        placeholder="02-0000-0000"
                        value={newInsurance.helpdesk}
                        onChange={(e) => setNewInsurance({...newInsurance, helpdesk: e.target.value})}
                        className="mt-1 border-rose-200 focus:ring-[#ff8fa3] focus:border-[#ff8fa3]"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label className="text-xs text-gray-500">서면청약 주소</Label>
                      <Input
                        placeholder="서면청약 발송 주소"
                        value={newInsurance.homepageUrl}
                        onChange={(e) => setNewInsurance({...newInsurance, homepageUrl: e.target.value})}
                        className="mt-1 border-rose-200 focus:ring-[#ff8fa3] focus:border-[#ff8fa3]"
                      />
                    </div>
                  </div>
                </div>

                {/* 링크 정보 */}
                <div className="pt-4 border-t border-rose-100">
                  <p className="text-sm font-medium text-gray-700 mb-3">링크 정보</p>
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <Label className="text-xs text-gray-500">보험금 청구 양식 URL</Label>
                      <Input
                        placeholder="https://..."
                        value={newInsurance.claimFormUrl}
                        onChange={(e) => setNewInsurance({...newInsurance, claimFormUrl: e.target.value})}
                        className="mt-1 border-rose-200 focus:ring-[#ff8fa3] focus:border-[#ff8fa3]"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">약관 확인 URL</Label>
                      <Input
                        placeholder="https://..."
                        value={newInsurance.termsUrl}
                        onChange={(e) => setNewInsurance({...newInsurance, termsUrl: e.target.value})}
                        className="mt-1 border-rose-200 focus:ring-[#ff8fa3] focus:border-[#ff8fa3]"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">치아보험 청구양식 URL</Label>
                      <Input
                        placeholder="https://..."
                        value={newInsurance.dentalFormUrl}
                        onChange={(e) => setNewInsurance({...newInsurance, dentalFormUrl: e.target.value})}
                        className="mt-1 border-rose-200 focus:ring-[#ff8fa3] focus:border-[#ff8fa3]"
                      />
                    </div>
                  </div>
                </div>
                </>
                )}

                {/* 지점장 정보 - 원수사 연락망 모드에서만 표시 */}
                {insuranceViewMode === "원수사" && (
                <>
                <div className="pt-4 border-t border-rose-100">
                  <p className="text-sm font-medium text-gray-700 mb-3">지점장 정보</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs text-gray-500">이름</Label>
                      <Input
                        placeholder="지점장 이름"
                        value={newInsurance.branchManagerName}
                        onChange={(e) => setNewInsurance({...newInsurance, branchManagerName: e.target.value})}
                        className="mt-1 border-rose-200 focus:ring-[#ff8fa3] focus:border-[#ff8fa3]"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">전화번호</Label>
                      <Input
                        placeholder="010-0000-0000"
                        value={newInsurance.branchManagerPhone}
                        onChange={(e) => setNewInsurance({...newInsurance, branchManagerPhone: e.target.value})}
                        className="mt-1 border-rose-200 focus:ring-[#ff8fa3] focus:border-[#ff8fa3]"
                      />
                    </div>
                  </div>
                </div>

                {/* 메모 */}
                <div className="pt-4 border-t border-rose-100">
                  <Label className="text-sm font-medium text-gray-700">메모</Label>
                  <textarea
                    placeholder="메모를 입력하세요..."
                    value={newInsurance.memo}
                    onChange={(e) => setNewInsurance({...newInsurance, memo: e.target.value})}
                    className="mt-1 w-full p-3 border border-rose-200 rounded-xl text-sm focus:ring-[#ff8fa3] focus:border-[#ff8fa3] resize-none"
                    rows={3}
                  />
                </div>
                </>
                )}
              </div>
              
              <div className="flex gap-3 mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setShowInsuranceModal(false)}
                  className="flex-1"
                  >
                    취소
                  </Button>
                <Button 
                  onClick={handleSaveInsurance}
                  disabled={isSaving || !newInsurance.name.trim()}
                  className="flex-1 bg-[#ff6b8a] hover:bg-[#ff5577] text-white disabled:opacity-50"
                >
                  {isSaving ? "저장 중..." : insuranceModalMode === "write" ? "추가" : "저장"}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* 설계매니저 추가/수정 모달 */}
        {showManagerModal && selectedInsurance && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800">
                  {editingManagerId ? "설계매니저 수정" : "설계매니저 추가"}
                </h2>
<button
  onClick={() => {
  setShowManagerModal(false)
  setNewManager({ name: "", phone: "", kakaoUrl: "" })
  setEditingManagerId(null)
  setSelectedInsurance(null)
  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <p className="text-sm text-gray-500 mb-4">{selectedInsurance.name}</p>
              
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">이름</Label>
                  <Input
                    placeholder="매니저 이름"
                    value={newManager.name}
                    onChange={(e) => setNewManager({...newManager, name: e.target.value})}
                    className="mt-1 border-rose-200 focus:ring-[#ff8fa3] focus:border-[#ff8fa3]"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">전화번호</Label>
                  <Input
                    placeholder="010-0000-0000"
                    value={newManager.phone}
                    onChange={(e) => setNewManager({...newManager, phone: e.target.value})}
                    className="mt-1 border-rose-200 focus:ring-[#ff8fa3] focus:border-[#ff8fa3]"
                  />
                </div>
                <div>
                    <Label className="text-sm font-medium text-gray-700">카카오톡 URL (선택)</Label>
                  <Input
                    placeholder="https://open.kakao.com/..."
                    value={newManager.kakaoUrl}
                    onChange={(e) => setNewManager({...newManager, kakaoUrl: e.target.value})}
                    className="mt-1 border-rose-200 focus:ring-[#ff8fa3] focus:border-[#ff8fa3]"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
<Button
  variant="outline"
  onClick={() => {
  setShowManagerModal(false)
  setNewManager({ name: "", phone: "", kakaoUrl: "" })
  setEditingManagerId(null)
  setSelectedInsurance(null)
  }}
                  className="flex-1 border-rose-200"
                >
                  취소
                </Button>
                <Button 
                  onClick={() => editingManagerId ? handleEditManager() : handleAddManager(selectedInsurance.id)}
                  disabled={isSaving || !newManager.name.trim() || !newManager.phone.trim()}
                  className="flex-1 bg-[#ff6b8a] hover:bg-[#ff5577] text-white disabled:opacity-50"
                >
                  {isSaving ? "저장 중..." : editingManagerId ? "저장" : "추가"}
                </Button>
              </div>
            </div>
          </div>
        )}
        
              {/* 지점장/부지점장/설계매니저 추가/수정 모달 */}
  {showBranchManagerModal && selectedInsurance && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
  <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl">
  <div className="flex items-center justify-between mb-4">
  <div>
    <h2 className="text-lg font-semibold text-gray-800">
    {editingBranchManagerId ? "담당자 수정" : "담당자 추가"}
    </h2>
    <p className="text-sm text-gray-500 mt-1">{selectedInsurance.name}</p>
  </div>
  <button
  onClick={() => {
  setShowBranchManagerModal(false)
  setNewBranchManager({ name: "", phone: "", kakaoUrl: "", role: "branch_manager" })
  setEditingBranchManagerId(null)
  setSelectedInsurance(null)
  }}
  className="text-gray-400 hover:text-gray-600"
  >
  <X className="h-5 w-5" />
  </button>
  </div>
  
  <div className="space-y-4">
  <div>
  <Label className="text-sm font-medium text-gray-700">직책</Label>
  <div className="mt-2 grid grid-cols-3 gap-2">
  <button
  onClick={() => setNewBranchManager({...newBranchManager, role: "branch_manager"})}
  className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
  newBranchManager.role === "branch_manager"
  ? "bg-[#ff6b8a] text-white"
  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
  }`}
  >
  지점장
  </button>
  <button
  onClick={() => setNewBranchManager({...newBranchManager, role: "assistant_branch_manager"})}
  className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
  newBranchManager.role === "assistant_branch_manager"
  ? "bg-violet-400 text-white"
  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
  }`}
  >
  부지점장
  </button>
  <button
  onClick={() => setNewBranchManager({...newBranchManager, role: "education_manager"})}
  className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
  newBranchManager.role === "education_manager"
  ? "bg-emerald-400 text-white"
  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
  }`}
  >
  교육매니저
  </button>
                      </div>
                    </div>
                    
                    {/* 공감 & 댓글 버튼 */}
                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-rose-100">
                      <button 
                        onClick={() => toggleLike(report.id)}
                        className={cn(
                          "flex items-center gap-1.5 text-sm font-medium transition-colors",
                          isLikedByMe(report.id) 
                            ? "text-rose-500" 
                            : "text-gray-400 hover:text-rose-400"
                        )}
                      >
                        <Heart className={cn("h-4 w-4", isLikedByMe(report.id) && "fill-rose-500")} />
                        <span>공감 {getReportLikes(report.id).length > 0 ? getReportLikes(report.id).length : ""}</span>
                      </button>
                      <button 
                        onClick={() => setExpandedComments(expandedComments === report.id ? null : report.id)}
                        className={cn(
                          "flex items-center gap-1.5 text-sm font-medium transition-colors",
                          expandedComments === report.id
                            ? "text-rose-500"
                            : "text-gray-400 hover:text-rose-400"
                        )}
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span>댓글 {getReportComments(report.id).length > 0 ? getReportComments(report.id).length : ""}</span>
                      </button>
                    </div>

                    {/* 댓글 영역 */}
                    {expandedComments === report.id && (
                      <div className="mt-3 pt-3 border-t border-rose-100">
                        {/* 댓글 목록 */}
                        {getReportComments(report.id).length > 0 && (
                          <div className="space-y-2 mb-3">
                            {getReportComments(report.id).map((comment) => (
                              <div key={comment.id} className="p-2.5 bg-white rounded-lg border border-rose-100">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-xs font-semibold text-gray-700">{comment.nickname}</span>
                                  <div className="flex items-center gap-1">
                                    <span className="text-[10px] text-gray-400">
                                      {new Date(comment.created_at).toLocaleDateString("ko-KR", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                                    </span>
                                    <button 
                                      onClick={() => { setEditingAttCommentId(comment.id); setEditingAttCommentText(comment.content); }}
                                      className="p-0.5 text-gray-300 hover:text-rose-400"
                                    >
                                      <Pencil className="h-3 w-3" />
                                    </button>
                                    <button 
                                      onClick={() => deleteComment(comment.id, report.id)}
                                      className="p-0.5 text-gray-300 hover:text-rose-500"
                                    >
                                      <X className="h-3 w-3" />
                                    </button>
                                  </div>
                                </div>
                                {editingAttCommentId === comment.id ? (
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="text"
                                      value={editingAttCommentText}
                                      onChange={(e) => setEditingAttCommentText(e.target.value)}
                                      onKeyDown={(e) => e.key === "Enter" && updateComment(comment.id, report.id)}
                                      className="flex-1 text-sm border border-rose-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-rose-300"
                                      autoFocus
                                    />
                                    <button 
                                      onClick={() => updateComment(comment.id, report.id)}
                                      className="text-xs px-2 py-1 bg-rose-400 text-white rounded-lg hover:bg-rose-500"
                                    >
                                      수정
                                    </button>
                                    <button 
                                      onClick={() => { setEditingAttCommentId(null); setEditingAttCommentText(""); }}
                                      className="text-xs px-2 py-1 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300"
                                    >
                                      취소
                                    </button>
                                  </div>
                                ) : (
                                  <p className="text-sm text-gray-600">{comment.content}</p>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* 댓글 입력 */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              placeholder="닉네임 (선택)"
                              value={newCommentNickname}
                              onChange={(e) => setNewCommentNickname(e.target.value)}
                              className="w-24 text-sm border border-rose-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-rose-300 placeholder-gray-400"
                            />
                            <div className="flex-1 flex items-center gap-2">
                              <input
                                type="text"
                                placeholder="댓글을 입력하세요"
                                value={newCommentText}
                                onChange={(e) => setNewCommentText(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && submitComment(report.id)}
                                className="flex-1 text-sm border border-rose-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-rose-300 placeholder-gray-400"
                              />
                              <button 
                                onClick={() => submitComment(report.id)}
                                disabled={!newCommentText.trim()}
                                className="p-2 bg-rose-400 hover:bg-rose-500 disabled:bg-gray-300 text-white rounded-lg transition-colors"
                              >
                                <Send className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                <div>
                  <Label className="text-sm font-medium text-gray-700">이름</Label>
                  <Input
                    placeholder="이름"
                    value={newBranchManager.name}
                    onChange={(e) => setNewBranchManager({...newBranchManager, name: e.target.value})}
                    className="mt-1 border-rose-200 focus:ring-[#ff8fa3] focus:border-[#ff8fa3]"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">전화번호</Label>
                  <Input
                    placeholder="010-0000-0000"
                    value={newBranchManager.phone}
                    onChange={(e) => setNewBranchManager({...newBranchManager, phone: e.target.value})}
                    className="mt-1 border-rose-200 focus:ring-[#ff8fa3] focus:border-[#ff8fa3]"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">카카오톡 URL (선택)</Label>
                  <Input
                    placeholder="https://open.kakao.com/..."
                    value={newBranchManager.kakaoUrl}
                    onChange={(e) => setNewBranchManager({...newBranchManager, kakaoUrl: e.target.value})}
                    className="mt-1 border-rose-200 focus:ring-[#ff8fa3] focus:border-[#ff8fa3]"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
<Button
  variant="outline"
  onClick={() => {
  setShowBranchManagerModal(false)
  setNewBranchManager({ name: "", phone: "", kakaoUrl: "", role: "branch_manager" })
  setEditingBranchManagerId(null)
  setSelectedInsurance(null)
  }}
                  className="flex-1 border-rose-200"
                >
                  취소
                </Button>
<Button
  onClick={() => editingBranchManagerId ? handleEditBranchManager() : handleAddBranchManager(selectedInsurance.id)}
  disabled={isSaving || !newBranchManager.name.trim()}
  className={`flex-1 text-white disabled:opacity-50 ${
  newBranchManager.role === "assistant_branch_manager"
  ? "bg-violet-400 hover:bg-violet-500"
  : newBranchManager.role === "education_manager"
  ? "bg-emerald-400 hover:bg-emerald-500"
  : "bg-[#ff6b8a] hover:bg-[#ff5577]"
  }`}
  >
  {isSaving ? "저장 중..." : editingBranchManagerId ? "저장" : "추가"}
  </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* 교육매니저 추가/수정 모달 */}
        {showEducationManagerModal && selectedInsurance && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800">
                  {editingEducationManagerId ? "교육매니저 수정" : "교육매니저 추가"}
                </h2>
                <button 
                  onClick={() => {
                    setShowEducationManagerModal(false)
                    setNewEducationManager({ name: "", phone: "" })
                    setEditingEducationManagerId(null)
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <p className="text-sm text-gray-500 mb-4">{selectedInsurance.name}</p>
              
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">이름</Label>
                  <Input
                    placeholder="교육매니저 이름"
                    value={newEducationManager.name}
                    onChange={(e) => setNewEducationManager({...newEducationManager, name: e.target.value})}
                    className="mt-1 border-emerald-200 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">전화번호</Label>
                  <Input
                    placeholder="010-0000-0000"
                    value={newEducationManager.phone}
                    onChange={(e) => setNewEducationManager({...newEducationManager, phone: e.target.value})}
                    className="mt-1 border-emerald-200 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowEducationManagerModal(false)
                    setNewEducationManager({ name: "", phone: "" })
                    setEditingEducationManagerId(null)
                  }}
                  className="flex-1 border-emerald-200"
                >
                  취소
                </Button>
                <Button 
                  onClick={() => editingEducationManagerId ? handleEditEducationManager() : handleAddEducationManager(selectedInsurance.id)}
                  disabled={isSaving || !newEducationManager.name.trim()}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white disabled:opacity-50"
                >
                  {isSaving ? "저장 중..." : editingEducationManagerId ? "저장" : "추가"}
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* 보험사 연락처 상세 팝업 (연락처 뷰에서만 사용) */}
        {showInsuranceDetailPopup && selectedInsurance && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50" onClick={() => { setShowInsuranceDetailPopup(false); setSelectedInsurance(null); }}>
            <div 
              className="bg-gradient-to-br from-[#fff5f7] to-[#f8f0ff] rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 헤더 */}
              <div className="sticky top-0 bg-white/80 backdrop-blur-sm p-4 flex items-center justify-between border-b border-rose-100">
                <div className="flex items-center gap-3">
                  {selectedInsurance.logoUrl ? (
                    <img src={selectedInsurance.logoUrl} alt={selectedInsurance.name} className="h-8 w-auto max-w-[120px] object-contain" />
                  ) : (
                    <span className="text-lg font-bold text-gray-800">{selectedInsurance.name}</span>
                  )}
                </div>
<button
  onClick={() => { setShowInsuranceDetailPopup(false); setSelectedInsurance(null); }}
  className="p-2 hover:bg-rose-100 rounded-full text-gray-400 hover:text-gray-600"
  >
  <X className="h-5 w-5" />
                </button>
              </div>
              
              {/* 서비스 카드 그리드 */}
              <div className="p-4 grid grid-cols-2 gap-3">
                {/* 빈 상태 체크 */}
                {!selectedInsurance.computerSystemUrl && 
                 !selectedInsurance.customerService && 
                 !selectedInsurance.incallMonitoring && 
                 !selectedInsurance.helpdesk && 
                 !selectedInsurance.claimFax && 
                 !selectedInsurance.termsUrl && 
                 !selectedInsurance.claimFormUrl && 
                 !selectedInsurance.dentalFormUrl && 
                 !selectedInsurance.fax && 
                 !selectedInsurance.address && 
                 !selectedInsurance.homepageUrl && (
                  <div className="col-span-2 text-center py-8 text-gray-400">
                    등록된 연락처 정보가 없습니다.
                      {isAdmin && <p className="text-xs mt-2">관리자 모드에서 보험사 정보를 수정해주세요.</p>}
                  </div>
                )}
                
                {/* 보험회사 전산 */}
                {selectedInsurance.computerSystemUrl && (
                  <a 
                    href={selectedInsurance.computerSystemUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white rounded-2xl p-4 flex flex-col items-center text-center hover:shadow-lg transition-shadow"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-3">
                      <Globe className="h-6 w-6 text-gray-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-700">보험회사</p>
                    <p className="text-sm font-medium text-gray-700">전산</p>
                  </a>
                )}
                
                {/* 고객센터 */}
                {selectedInsurance.customerService && (
                  <a 
                    href={`tel:${selectedInsurance.customerService}`}
                    className="bg-white rounded-2xl p-4 flex flex-col items-center text-center hover:shadow-lg transition-shadow"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-3">
                      <Phone className="h-6 w-6 text-gray-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-700">고객 센터</p>
                    <p className="text-sm font-bold text-[#ff6b8a]">{selectedInsurance.customerService}</p>
                  </a>
                )}
                
                {/* 인콜 모니터링 */}
                {selectedInsurance.incallMonitoring && (
                  <a 
                    href={`tel:${selectedInsurance.incallMonitoring}`}
                    className="bg-white rounded-2xl p-4 flex flex-col items-center text-center hover:shadow-lg transition-shadow"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-3">
                      <Phone className="h-6 w-6 text-gray-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-700">인콜 모니터링</p>
                    <p className="text-sm font-bold text-[#ff6b8a]">{selectedInsurance.incallMonitoring}</p>
                  </a>
                )}
                
                {/* 전산 헬프데스크 */}
                {selectedInsurance.helpdesk && (
                  <a 
                    href={`tel:${selectedInsurance.helpdesk}`}
                    className="bg-white rounded-2xl p-4 flex flex-col items-center text-center hover:shadow-lg transition-shadow"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-3">
                      <Phone className="h-6 w-6 text-gray-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-700">전산 헬프데스크</p>
                    <p className="text-sm font-bold text-[#ff6b8a]">{selectedInsurance.helpdesk}</p>
                  </a>
                )}
                
                {/* 보험금 청구팩스 */}
                {selectedInsurance.claimFax && (
                  <div className="bg-white rounded-2xl p-4 flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-3">
                      <FileText className="h-6 w-6 text-gray-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-700">보험금 청구팩스</p>
                    <p className="text-sm font-bold text-[#ff6b8a]">{selectedInsurance.claimFax}</p>
                  </div>
                )}
                
                {/* 약관 확인 */}
                {selectedInsurance.termsUrl && (
                  <a 
                    href={selectedInsurance.termsUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white rounded-2xl p-4 flex flex-col items-center text-center hover:shadow-lg transition-shadow"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-3">
                      <FileText className="h-6 w-6 text-gray-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-700">약관 확인</p>
                  </a>
                )}
                
                {/* 청구서 */}
                {selectedInsurance.claimFormUrl && (
                  <a 
                    href={selectedInsurance.claimFormUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white rounded-2xl p-4 flex flex-col items-center text-center hover:shadow-lg transition-shadow"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-3">
                      <FileText className="h-6 w-6 text-gray-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-700">보험금</p>
                    <p className="text-sm font-medium text-gray-700">청구양식</p>
                  </a>
                )}
                
                {/* 치과서류 */}
                {selectedInsurance.dentalFormUrl && (
                  <a 
                    href={selectedInsurance.dentalFormUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white rounded-2xl p-4 flex flex-col items-center text-center hover:shadow-lg transition-shadow"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-3">
                      <FileText className="h-6 w-6 text-gray-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-700">(손보) 치아보험</p>
                    <p className="text-sm font-medium text-gray-700">청구양식</p>
                  </a>
                )}
                
                {/* 동의서 FAX */}
                {selectedInsurance.fax && (
                  <div className="bg-white rounded-2xl p-4 flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-3">
                      <FileText className="h-6 w-6 text-gray-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-700">동의서 FAX</p>
                    <p className="text-sm font-bold text-[#ff6b8a]">{selectedInsurance.fax}</p>
                  </div>
                )}
                
                    {/* 청구 주소 */}
                {selectedInsurance.address && (
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(selectedInsurance.address || '')
                      alert('주소가 복사되었습니다.')
                    }}
                    className="bg-white rounded-2xl p-4 flex flex-col items-center text-center hover:shadow-lg transition-shadow col-span-2"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-3">
                      <MapPin className="h-6 w-6 text-gray-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-700 mb-1">청구 주소</p>
                    <p className="text-xs text-gray-500">{selectedInsurance.address}</p>
                    <p className="text-xs text-[#ff6b8a] mt-1">탭하여 복사</p>
                  </button>
                )}
                
                {/* 서면청약 주소 */}
                {selectedInsurance.homepageUrl && (
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(selectedInsurance.homepageUrl || '')
                      alert('서면청약 주소가 복사되었습니다.')
                    }}
                    className="bg-white rounded-2xl p-4 flex flex-col items-center text-center hover:shadow-lg transition-shadow col-span-2"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-3">
                      <MapPin className="h-6 w-6 text-gray-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-700 mb-1">서면청약 주소</p>
                    <p className="text-xs text-gray-500">{selectedInsurance.homepageUrl}</p>
                    <p className="text-xs text-[#ff6b8a] mt-1">탭하여 복사</p>
                  </button>
                )}
              </div>
              
              
            </div>
          </div>
        )}
      </main>
    )
  }
  
  // 자료실 상세 페이지
  if (showResources && selectedResource) {
    return (
      <main className="min-h-screen bg-rose-50/30">
        <div className="max-w-2xl mx-auto p-4 md:p-6">
          {/* 헤더 */}
          <div className="flex items-center justify-between mb-6">
            <Button 
              variant="outline" 
              size="sm"
              onClick={closeResourceDetail}
              className="border-rose-200 hover:bg-rose-50"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              목록으로
            </Button>
            <div className="flex items-center gap-1">
              <button
                onClick={() => openResourceEditModal(selectedResource)}
                className="p-2 rounded-lg hover:bg-rose-100 text-gray-400 hover:text-rose-500 transition-colors"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                onClick={() => setShowResourceDeleteConfirm(selectedResource.id)}
                className="p-2 rounded-lg hover:bg-rose-100 text-gray-400 hover:text-rose-500 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* 자료 내용 */}
          <div className="bg-white rounded-2xl shadow-sm border border-rose-100 p-6">
            <div className="flex items-center gap-2 mb-2">
              {selectedResource.category && (
                <Badge variant="outline" className="text-xs px-2 py-0.5 border-rose-200 text-rose-400">
                  {selectedResource.category}
                </Badge>
              )}
              <span className="text-xs text-gray-400">
                {new Date(selectedResource.createdAt).toLocaleDateString("ko-KR")}
              </span>
            </div>
            
            <h1 className="text-xl font-bold text-gray-800 mb-4">{selectedResource.title}</h1>
            
            {selectedResource.description && (
              <p className="text-gray-600 mb-6 whitespace-pre-wrap">{selectedResource.description}</p>
            )}
            
            {/* 이미지 미리보기 (다중 파일 지원) */}
            {selectedResource.fileUrl && (() => {
              let urls: string[] = []
              let names: string[] = []
              try {
                const parsed = JSON.parse(selectedResource.fileUrl)
                const parsedNames = JSON.parse(selectedResource.fileName)
                urls = Array.isArray(parsed) ? parsed : [selectedResource.fileUrl]
                names = Array.isArray(parsedNames) ? parsedNames : [selectedResource.fileName]
              } catch {
                urls = [selectedResource.fileUrl]
                names = [selectedResource.fileName]
              }
              const imageFiles = urls.filter((_, i) => /\.(jpg|jpeg|png|webp|gif)$/i.test(names[i] || "") || urls[i].startsWith("data:image/"))
              return imageFiles.length > 0 ? (
                <div className="mb-6 space-y-3">
                  {imageFiles.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt={`${selectedResource.title} ${i + 1}`}
                      className="max-w-full h-auto rounded-lg border border-rose-100"
                      crossOrigin="anonymous"
                    />
                  ))}
                </div>
              ) : null
            })()}
            
            {/* 첨부파일/링크 */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-rose-100">
              {selectedResource.fileUrl && (() => {
                let urls: string[] = []
                let names: string[] = []
                try {
                  const parsed = JSON.parse(selectedResource.fileUrl)
                  const parsedNames = JSON.parse(selectedResource.fileName)
                  urls = Array.isArray(parsed) ? parsed : [selectedResource.fileUrl]
                  names = Array.isArray(parsedNames) ? parsedNames : [selectedResource.fileName]
                } catch {
                  urls = [selectedResource.fileUrl]
                  names = [selectedResource.fileName]
                }
                return urls.map((url, i) => (
                  <a
                    key={i}
                    href={url}
                    download={names[i] || `파일${i+1}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-100 transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    {names[i] || "파일 다운로드"}
                  </a>
                ))
              })()}
              {selectedResource.linkUrl && selectedResource.linkUrl.trim() !== "" && (
                <a
                  href={/^https?:\/\//i.test(selectedResource.linkUrl.trim()) ? selectedResource.linkUrl.trim() : `https://${selectedResource.linkUrl.trim()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-100 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  링크 열기
                </a>
              )}
            </div>
          </div>

          {/* 댓글 섹션 */}
          <div className="bg-white rounded-2xl shadow-sm border border-rose-100 p-6 mt-4">
            <div className="flex items-center gap-2 text-base font-semibold text-gray-800 mb-4">
              <MessageCircle className="h-5 w-5 text-rose-400" />
              댓글 ({resourceComments.length})
            </div>
            
            {/* 댓글 입력 */}
            <div className="flex gap-2 mb-4">
              <Input
                placeholder="닉네임"
                value={newComment.nickname}
                onChange={(e) => setNewComment({...newComment, nickname: e.target.value})}
                className="w-28 text-sm border-rose-200 focus:ring-rose-400"
              />
              <Input
                placeholder="댓글을 입력하세요"
                value={newComment.content}
                onChange={(e) => setNewComment({...newComment, content: e.target.value})}
                className="flex-1 text-sm border-rose-200 focus:ring-rose-400"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleAddComment(selectedResource.id)
                  }
                }}
              />
              <Button
                size="sm"
                onClick={() => handleAddComment(selectedResource.id)}
                disabled={isSaving || !newComment.nickname.trim() || !newComment.content.trim()}
                className="bg-rose-400 hover:bg-rose-500 text-white disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>

            {/* 댓글 목록 */}
            {isLoadingComments ? (
              <div className="text-center py-4 text-gray-400 text-sm">로딩 중...</div>
            ) : resourceComments.length > 0 ? (
              <div className="space-y-3">
                {resourceComments.map((comment) => (
                  <div key={comment.id} className="p-3 rounded-lg bg-rose-50/50 border border-rose-100">
                    {editingCommentId === comment.id ? (
                      <div className="flex gap-2">
                        <Input
                          value={editingCommentContent}
                          onChange={(e) => setEditingCommentContent(e.target.value)}
                          className="flex-1 text-sm border-rose-200 focus:ring-rose-400"
                          autoFocus
                        />
                        <Button
                          size="sm"
                          onClick={() => handleEditComment(comment.id, selectedResource.id)}
                          disabled={isSaving}
                          className="bg-rose-400 hover:bg-rose-500 text-white disabled:opacity-50"
                        >
                          저장
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => { setEditingCommentId(null); setEditingCommentContent(""); }}
                          className="border-rose-200"
                        >
                          취소
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-700">{comment.nickname}</span>
                            <span className="text-xs text-gray-400">
                              {new Date(comment.created_at).toLocaleDateString("ko-KR", { 
                                year: "numeric", month: "2-digit", day: "2-digit", 
                                hour: "2-digit", minute: "2-digit" 
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => { setEditingCommentId(comment.id); setEditingCommentContent(comment.content); }}
                              className="p-1 rounded hover:bg-rose-100 text-gray-300 hover:text-rose-400 transition-colors"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteComment(comment.id, selectedResource.id)}
                              disabled={isSaving}
                              className="p-1 rounded hover:bg-rose-100 text-gray-300 hover:text-rose-400 transition-colors disabled:opacity-50"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{comment.content}</p>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-400 text-sm">댓글이 없습니다.</div>
            )}
          </div>
        </div>

        {/* 삭제 확인 모달 */}
        {showResourceDeleteConfirm !== null && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">삭제 확인</h2>
              <p className="text-gray-500 mb-6">정말 삭제하시겠습니까?</p>
              
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setShowResourceDeleteConfirm(null)}
                  className="flex-1 border-rose-200 hover:bg-rose-50"
                >
                  취소
                </Button>
                <Button 
                  onClick={async () => {
                    await handleDeleteResource(showResourceDeleteConfirm!)
                    closeResourceDetail()
                  }}
                  disabled={isSaving}
                  className="flex-1 bg-rose-400 hover:bg-rose-500 text-white disabled:opacity-50"
                >
                  {isSaving ? "삭제 중..." : "삭제"}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* 자료 수정 모달 */}
        {showResourceModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800">자료 수정</h2>
                <button 
                  onClick={() => setShowResourceModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="resourceTitle2" className="text-sm font-medium text-gray-700">제목</Label>
                  <Input
                    id="resourceTitle2"
                    placeholder="자료 제목을 입력하세요"
                    value={newResource.title}
                    onChange={(e) => setNewResource({...newResource, title: e.target.value})}
                    className="mt-1 border-rose-200 focus:ring-rose-400"
                  />
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-gray-700">카테고리</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setNewResource({...newResource, category: cat.name})}
                        className={cn(
                          "px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors",
                          newResource.category === cat.name
                            ? "bg-rose-400 text-white border-rose-400"
                            : "border-rose-200 text-gray-600 hover:bg-rose-50"
                        )}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="resourceDesc2" className="text-sm font-medium text-gray-700">설명</Label>
                  <Textarea
                    id="resourceDesc2"
                    placeholder="자료 설명을 입력하세요"
                    value={newResource.description}
                    onChange={(e) => setNewResource({...newResource, description: e.target.value})}
                    className="mt-1 border-rose-200 focus:ring-rose-400 resize-none"
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-gray-700">파일 업로드</Label>
                  <div className="mt-1">
                    <FileUploadBox
                      accept="document"
                      multiple
                      isUploading={isUploading}
                      onFileSelect={handleSingleFileUpload}
                      onMultiFileSelect={handleMultiFileUpload}
                      error={uploadError}
                      success={uploadSuccess}
                    />
                  </div>
                  {uploadedFiles.length > 0 && (
                    <div className="mt-3 p-3 bg-rose-50/50 rounded-xl border border-rose-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                          <Upload className="h-3.5 w-3.5 text-rose-400" />
                          업로드 파일 ({uploadedFiles.length}개) - {getTotalUploadSize()}
                        </span>
                      </div>
                      <div className="space-y-1.5">
                        {uploadedFiles.map((file, index) => {
                          const isImage = /\.(jpg|jpeg|png|webp|gif)$/i.test(file.fileName) || file.fileUrl.startsWith("data:image/")
                          return (
                            <div key={index} className="flex items-center justify-between p-2 bg-white rounded-lg border border-rose-100">
                              <div className="flex items-center gap-2 min-w-0">
                                {isImage ? (
                                  <img src={file.fileUrl} alt={file.fileName} className="h-8 w-8 object-cover rounded" crossOrigin="anonymous" />
                                ) : (
                                  <FileText className="h-4 w-4 text-rose-400 shrink-0" />
                                )}
                                <span className="text-sm text-gray-700 truncate">{file.fileName}</span>
                              </div>
                              <button onClick={() => removeUploadedFile(index)} className="p-1 hover:bg-rose-100 rounded-full text-gray-400 hover:text-rose-500 shrink-0">
                                <X className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="resourceLink2" className="text-sm font-medium text-gray-700">링크 URL</Label>
                  <Input
                    id="resourceLink2"
                    placeholder="https://..."
                    value={newResource.linkUrl}
                    onChange={(e) => setNewResource({...newResource, linkUrl: e.target.value})}
                    className="mt-1 border-rose-200 focus:ring-rose-400"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setShowResourceModal(false)}
                  className="flex-1 border-rose-200 hover:bg-rose-50"
                >
                  취소
                </Button>
                <Button 
                  onClick={async () => {
                    await handleSaveResource()
                    // 수정 후 상세 페이지 데이터 갱신
                    const updated = resources.find(r => r.id === editingResourceId)
                    if (updated) {
                      const fileUrls = uploadedFiles.map(f => f.fileUrl)
                      const fileNames = uploadedFiles.map(f => f.fileName)
                      setSelectedResource({
                        ...updated,
                        ...newResource,
                        fileUrl: fileUrls.length > 0 ? JSON.stringify(fileUrls) : updated.fileUrl,
                        fileName: fileNames.length > 0 ? JSON.stringify(fileNames) : updated.fileName
                      })
                    }
                  }}
                  disabled={isSaving}
                  className="flex-1 bg-rose-400 hover:bg-rose-500 text-white disabled:opacity-50"
                >
                  {isSaving ? "저장 중..." : "저장"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    )
  }
  
  // 자료실 목록 UI
  if (showResources) {
    return (
      <main className="min-h-screen bg-rose-50/30">
        <div className="max-w-2xl mx-auto p-4 md:p-6">
          {/* 헤더 */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowResources(false)}
                className="border-rose-200 hover:bg-rose-50"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                돌아가기
              </Button>
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">자료실</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={openResourceWriteModal}
                className="bg-rose-400 hover:bg-rose-500 text-white"
              >
                <Plus className="h-4 w-4 mr-1" />
                자료추가
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCategoryManager(true)}
                className="border-rose-200 hover:bg-rose-50"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
  
          {/* 카테고리 필터 */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            {categoryNames.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                  selectedCategory === cat
                    ? "bg-rose-400 text-white"
                    : "bg-white border border-rose-200 text-gray-600 hover:bg-rose-50"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 검색창 */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="자료 제목, 설명, 카테고리 검색"
              value={resourceSearch}
              onChange={(e) => setResourceSearch(e.target.value)}
              className="pl-10 border-rose-200 focus:ring-rose-400"
            />
          </div>
  
          {/* 자료 목록 - 게시판 스타일 */}
          <div className="bg-white rounded-2xl shadow-sm border border-rose-100 overflow-hidden">
            {/* 테이블 헤더 */}
            <div className="hidden md:grid grid-cols-12 gap-2 px-4 py-3 bg-rose-50/50 border-b border-rose-100 text-xs font-medium text-gray-500">
              <div className="col-span-2">카테고리</div>
              <div className="col-span-6">제목</div>
              <div className="col-span-2 text-center">작성일</div>
              <div className="col-span-2 text-right">관리</div>
            </div>

            {filteredResources.length > 0 ? (
              <div className="divide-y divide-rose-50">
                {filteredResources.map((resource) => (
                  <div 
                    key={resource.id}
                    className="px-4 py-3 hover:bg-rose-50/30 transition-colors cursor-pointer"
                    onClick={() => openResourceDetail(resource)}
                  >
                    {/* 모바일 뷰 */}
                    <div className="md:hidden">
                      <div className="flex items-center gap-2 mb-1">
                        {resource.category && (
                          <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-rose-200 text-rose-400">
                            {resource.category}
                          </Badge>
                        )}
                        {resource.fileUrl && (() => {
                          let count = 1
                          try { const p = JSON.parse(resource.fileUrl); if (Array.isArray(p)) count = p.length } catch {}
                          return (
                            <span className="flex items-center gap-0.5 text-gray-400">
                              <Upload className="h-3 w-3" />
                              {count > 1 && <span className="text-[10px]">{count}</span>}
                            </span>
                          )
                        })()}
                        <span className="text-xs text-gray-400">
                          {new Date(resource.createdAt).toLocaleDateString("ko-KR")}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-800 text-sm">{resource.title}</h3>
                        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => openResourceEditModal(resource)}
                            className="p-1.5 rounded-lg hover:bg-rose-100 text-gray-400 hover:text-rose-500 transition-colors"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => setShowResourceDeleteConfirm(resource.id)}
                            className="p-1.5 rounded-lg hover:bg-rose-100 text-gray-400 hover:text-rose-500 transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* 데스크톱 뷰 */}
                    <div className="hidden md:grid grid-cols-12 gap-2 items-center">
                      <div className="col-span-2">
                        {resource.category && (
                          <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-rose-200 text-rose-400">
                            {resource.category}
                          </Badge>
                        )}
                      </div>
                      <div className="col-span-6 flex items-center gap-2">
                      <h3 className="font-medium text-gray-800 text-sm truncate">{resource.title}</h3>
                      {resource.fileUrl && (() => {
                        let count = 1
                        try { const p = JSON.parse(resource.fileUrl); if (Array.isArray(p)) count = p.length } catch {}
                        return (
                          <span className="flex items-center gap-0.5 text-gray-400 flex-shrink-0">
                            <Upload className="h-3.5 w-3.5" />
                            {count > 1 && <span className="text-[10px]">{count}</span>}
                          </span>
                        )
                      })()}
                        {resourceComments.length > 0 && (
                          <span className="text-xs text-rose-400 flex-shrink-0">
                            <MessageCircle className="h-3 w-3 inline mr-0.5" />
                          </span>
                        )}
                      </div>
                      <div className="col-span-2 text-center text-xs text-gray-400">
                        {new Date(resource.createdAt).toLocaleDateString("ko-KR")}
                      </div>
                      <div className="col-span-2 flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => openResourceEditModal(resource)}
                          className="p-1.5 rounded-lg hover:bg-rose-100 text-gray-400 hover:text-rose-500 transition-colors"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => setShowResourceDeleteConfirm(resource.id)}
                          className="p-1.5 rounded-lg hover:bg-rose-100 text-gray-400 hover:text-rose-500 transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                    {resourceSearch ? "검색 결과가 없습니다." : "등록된 자료가 없습니다."}
              </div>
            )}
          </div>
        </div>

        {/* 자료 추가/수정 모달 */}
        {showResourceModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-xl max-h-[90vh] flex flex-col">
              {/* 헤더 - 고정 */}
              <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-100 shrink-0">
                <h2 className="text-lg font-semibold text-gray-800">
                  {resourceModalMode === "write" ? "자료 추가" : "자료 수정"}
                </h2>
                <button 
                  onClick={() => setShowResourceModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              {/* 콘텐츠 - 스크롤 */}
              <div className="flex-1 overflow-y-auto p-6 pt-4 space-y-4">
                <div>
                  <Label htmlFor="resourceTitle" className="text-sm font-medium text-gray-700">제목</Label>
                  <Input
                    id="resourceTitle"
                    placeholder="자료 제목을 입력하세요"
                    value={newResource.title}
                    onChange={(e) => setNewResource({...newResource, title: e.target.value})}
                    className="mt-1 border-rose-200 focus:ring-rose-400"
                  />
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-gray-700">카테고리</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
{categories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setNewResource({...newResource, category: cat.name})}
                        className={cn(
                          "px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors",
                          newResource.category === cat.name
                            ? "bg-rose-400 text-white border-rose-400"
                            : "border-rose-200 text-gray-600 hover:bg-rose-50"
                        )}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="resourceDesc" className="text-sm font-medium text-gray-700">설명</Label>
                  <Textarea
                    id="resourceDesc"
                    placeholder="자료 설명을 입력하세요"
                    value={newResource.description}
                    onChange={(e) => setNewResource({...newResource, description: e.target.value})}
                    className="mt-1 border-rose-200 focus:ring-rose-400 resize-none"
                    rows={2}
                  />
                </div>
                
<div>
                  <Label className="text-sm font-medium text-gray-700">파일 업로드</Label>
                  <div className="mt-1">
                    <FileUploadBox
                      accept="document"
                      multiple
                      isUploading={isUploading}
                      onFileSelect={handleSingleFileUpload}
                      onMultiFileSelect={handleMultiFileUpload}
                      error={uploadError}
                      success={uploadSuccess}
                    />
                  </div>
                  {uploadedFiles.length > 0 && (
                    <div className="mt-3 p-3 bg-rose-50/50 rounded-xl border border-rose-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                          <Upload className="h-3.5 w-3.5 text-rose-400" />
                          업로드 파일 ({uploadedFiles.length}개) - {getTotalUploadSize()}
                        </span>
                      </div>
                      <div className="space-y-1.5">
                        {uploadedFiles.map((file, index) => {
                          const isImage = /\.(jpg|jpeg|png|webp|gif)$/i.test(file.fileName) || file.fileUrl.startsWith("data:image/")
                          return (
                            <div key={index} className="flex items-center justify-between p-2 bg-white rounded-lg border border-rose-100">
                              <div className="flex items-center gap-2 min-w-0">
                                {isImage ? (
                                  <img src={file.fileUrl} alt={file.fileName} className="h-8 w-8 object-cover rounded" crossOrigin="anonymous" />
                                ) : (
                                  <FileText className="h-4 w-4 text-rose-400 shrink-0" />
                                )}
                                <span className="text-sm text-gray-700 truncate">{file.fileName}</span>
                              </div>
                              <button onClick={() => removeUploadedFile(index)} className="p-1 hover:bg-rose-100 rounded-full text-gray-400 hover:text-rose-500 shrink-0">
                                <X className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="resourceLink" className="text-sm font-medium text-gray-700">링크 URL</Label>
                  <Input
                    id="resourceLink"
                    placeholder="https://..."
                    value={newResource.linkUrl}
                    onChange={(e) => setNewResource({...newResource, linkUrl: e.target.value})}
                    className="mt-1 border-rose-200 focus:ring-rose-400"
                  />
                </div>
              </div>
              
              {/* 푸터 - 고정 */}
              <div className="flex gap-3 p-6 pt-4 border-t border-gray-100 shrink-0">
                <Button 
                  variant="outline" 
                  onClick={() => setShowResourceModal(false)}
                  className="flex-1 border-rose-200 hover:bg-rose-50"
                >
                  취소
                </Button>
                <Button 
                  onClick={handleSaveResource}
                  disabled={isSaving}
                  className="flex-1 bg-rose-400 hover:bg-rose-500 text-white disabled:opacity-50"
                >
                  {isSaving ? "저장 중..." : "저장"}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* 삭제 확인 모달 */}
        {showResourceDeleteConfirm !== null && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">삭제 확인</h2>
              <p className="text-gray-500 mb-6">정말 삭제하시겠습니까?</p>
              
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setShowResourceDeleteConfirm(null)}
                  className="flex-1 border-rose-200 hover:bg-rose-50"
                >
                  취소
                </Button>
                <Button 
                  onClick={() => handleDeleteResource(showResourceDeleteConfirm!)}
                  disabled={isSaving}
                  className="flex-1 bg-rose-400 hover:bg-rose-500 text-white disabled:opacity-50"
                >
                  {isSaving ? "삭제 중..." : "삭제"}
                </Button>
              </div>
            </div>
          </div>
)}

        {/* 카테고리 관리 모달 */}
        {showCategoryManager && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800">카테고리 관리</h2>
                <button 
                  onClick={() => setShowCategoryManager(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              {/* 새 카테고리 추가 */}
              <div className="flex gap-2 mb-4">
                <Input
                  placeholder="새 카테고리 이름"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="flex-1 border-rose-200 focus:ring-rose-400"
                />
                <Button
                  onClick={handleAddCategory}
                  disabled={isSaving || !newCategoryName.trim()}
                  className="bg-rose-400 hover:bg-rose-500 text-white disabled:opacity-50"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
{/* 카테고리 목록 */}
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {categories.length > 0 ? (
                  categories.map((cat, index) => (
                    <div
                      key={cat.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-rose-50/50 border border-rose-100"
                    >
                      {editingCategoryId === cat.id ? (
                        <div className="flex-1 flex items-center gap-2 mr-2">
                          <Input
                            value={editingCategoryName}
                            onChange={(e) => setEditingCategoryName(e.target.value)}
                            className="flex-1 h-8 text-sm border-rose-200 focus:ring-rose-400"
                            autoFocus
                          />
                          <Button
                            size="sm"
                            onClick={() => handleEditCategory(cat.id)}
                            disabled={isSaving}
                            className="h-8 bg-rose-400 hover:bg-rose-500 text-white disabled:opacity-50"
                          >
                            저장
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => { setEditingCategoryId(null); setEditingCategoryName(""); }}
                            className="h-8 border-rose-200"
                          >
                            취소
                          </Button>
                        </div>
                      ) : (
                        <>
                          <span className="text-gray-700">{cat.name}</span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleMoveCategory(index, "up")}
                              disabled={isSaving || index === 0}
                              className="p-1.5 rounded-lg hover:bg-rose-100 text-gray-400 hover:text-rose-500 transition-colors disabled:opacity-30"
                            >
                              <ChevronUp className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleMoveCategory(index, "down")}
                              disabled={isSaving || index === categories.length - 1}
                              className="p-1.5 rounded-lg hover:bg-rose-100 text-gray-400 hover:text-rose-500 transition-colors disabled:opacity-30"
                            >
                              <ChevronDown className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => { setEditingCategoryId(cat.id); setEditingCategoryName(cat.name); }}
                              className="p-1.5 rounded-lg hover:bg-rose-100 text-gray-400 hover:text-rose-500 transition-colors"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteCategory(cat.id)}
                              disabled={isSaving}
                              className="p-1.5 rounded-lg hover:bg-rose-100 text-gray-400 hover:text-rose-500 transition-colors disabled:opacity-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-400">
                    등록된 카테고리가 없습니다.
                  </div>
                )}
              </div>
              
              <div className="mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowCategoryManager(false)}
                  className="w-full border-rose-200 hover:bg-rose-50"
                >
                  닫기
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    )
  }
  
  if (showCalendar) {
    return (
      <main className="min-h-screen bg-rose-50/30">
        <div className="max-w-6xl mx-auto p-4 md:p-6">
          {/* 헤더 */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowCalendar(false)}
                className="border-rose-200 hover:bg-rose-50"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                돌아가기
              </Button>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">예약현황 달력</h1>
                <p className="text-sm text-gray-500">라운지 예약 현황을 확인하세요</p>
              </div>
            </div>
            <Button 
              onClick={() => openAddModal(selectedDate || undefined)}
              className="bg-rose-400 hover:bg-rose-500 text-white"
            >
              <Plus className="h-4 w-4 mr-1" />
              예약추가
            </Button>
          </div>

          {/* 달력 카드 */}
          <div className="bg-white rounded-2xl shadow-sm border border-rose-100 p-4 md:p-6">
            <div className="flex items-center gap-2 text-base md:text-lg font-semibold text-gray-800 mb-4">
              <CalendarIcon className="h-5 w-5 text-rose-400" />
              월간 예약 현황
            </div>
            {renderCalendar()}
          </div>

          {/* 선택된 날짜의 예약 상세 */}
          <div className="mt-4 bg-white rounded-2xl shadow-sm border border-rose-100 p-4 md:p-6">
            <div className="text-base md:text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Badge className="bg-rose-400 hover:bg-rose-400">상세</Badge>
              {selectedDate ? `${formatSelectedDate()} 예약 현황` : "날짜를 선택하세요"}
            </div>
            {selectedDate ? (
              selectedDateReservations.length > 0 ? (
                <div className="space-y-3">
                  {selectedDateReservations.map((reservation) => (
                    <div 
                      key={reservation.id}
                      className="flex flex-col md:flex-row md:items-center justify-between p-3 rounded-xl bg-rose-50/50 border border-rose-100 gap-2"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 font-medium">
                          {reservation.customerName.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">{reservation.customerName}</div>
                          <div className="text-sm text-gray-500">
                            {reservation.route && <span className="mr-2">경로: {reservation.route}</span>}
                            {reservation.memo && <span>메모: {reservation.memo}</span>}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm ml-13 md:ml-0">
                        <div className="flex items-center gap-1">
                          <span className="text-gray-400">시간:</span>
                          <span className="font-medium text-gray-700">{reservation.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-gray-400">담당:</span>
                          <span className="font-medium text-gray-700">{reservation.manager}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  이 날짜에 예약이 없습니다.
                </div>
              )
            ) : (
              <div className="text-center py-8 text-gray-400">
                달력에서 ���짜를 클릭하면 상세 정보가 표시됩니다.
              </div>
            )}
          </div>

          {/* 예약 리스트 */}
          <div className="mt-4 bg-white rounded-2xl shadow-sm border border-rose-100 p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-base md:text-lg font-semibold text-gray-800">
                <List className="h-5 w-5 text-rose-400" />
                예약 리스트
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setReservationSort("newest")}
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium transition-colors",
                    reservationSort === "newest"
                      ? "bg-rose-400 text-white"
                      : "bg-rose-50 text-gray-600 hover:bg-rose-100"
                  )}
                >
                  최신순
                </button>
                <button
                  onClick={() => setReservationSort("upcoming")}
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium transition-colors",
                    reservationSort === "upcoming"
                      ? "bg-rose-400 text-white"
                      : "bg-rose-50 text-gray-600 hover:bg-rose-100"
                  )}
                >
                  예약일순
                </button>
              </div>
            </div>

            {/* 검색창 */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="고객명, 담당자, 날짜, 경로 검색"
                value={reservationSearch}
                onChange={(e) => setReservationSearch(e.target.value)}
                className="pl-10 border-rose-200 focus:ring-rose-400"
              />
            </div>

            {/* 예약 목록 */}
            {filteredAndSortedReservations.length > 0 ? (
              <div className="space-y-3">
                {filteredAndSortedReservations.map((reservation) => (
                  <div 
                    key={reservation.id}
                    className="p-4 rounded-xl bg-rose-50/50 border border-rose-100"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-gray-800">{reservation.customerName}</span>
                          <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-rose-200 text-rose-400">
                            {reservation.date}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-sm">
                          <div className="flex gap-4">
                            <span className="text-gray-500">시간: <span className="text-gray-700">{reservation.time}</span></span>
                            <span className="text-gray-500">담당: <span className="text-gray-700">{reservation.manager}</span></span>
                          </div>
                          {reservation.route && (
                            <div className="text-gray-500">경로: <span className="text-gray-700">{reservation.route}</span></div>
                          )}
                          {reservation.memo && (
                            <div className="text-gray-500">메모: <span className="text-gray-700">{reservation.memo}</span></div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openEditReservationModal(reservation)}
                          className="p-1.5 rounded-lg hover:bg-rose-100 text-gray-400 hover:text-rose-500 transition-colors"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setShowReservationDeleteConfirm(reservation.id)}
                          className="p-1.5 rounded-lg hover:bg-rose-100 text-gray-400 hover:text-rose-500 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                {reservationSearch ? "검색 결과가 없습니다." : "등록된 예약이 없습니다."}
              </div>
            )}
          </div>
        </div>

        {/* 예약 삭제 확인 모달 */}
        {showReservationDeleteConfirm !== null && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">삭제 확인</h2>
              <p className="text-gray-500 mb-6">정말 삭제하시겠습니까?</p>
              
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setShowReservationDeleteConfirm(null)}
                  className="flex-1 border-rose-200 hover:bg-rose-50"
                >
                  취소
                </Button>
                <Button 
                  onClick={() => handleDeleteReservation(showReservationDeleteConfirm!)}
                  disabled={isSaving}
                  className="flex-1 bg-rose-400 hover:bg-rose-500 text-white disabled:opacity-50"
                >
                  {isSaving ? "삭제 중..." : "삭제"}
                </Button>
              </div>
            </div>
          </div>
        )}

              {/* 예약 추가/수정 모달 */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800">
                  {reservationModalMode === "add" ? "예약 추가" : "예약 수정"}
                </h2>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="date" className="text-sm font-medium text-gray-700">날짜</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newReservation.date}
                    onChange={(e) => setNewReservation({...newReservation, date: e.target.value})}
                    className="mt-1 border-rose-200 focus:ring-rose-400"
                  />
                </div>
                
                <div>
                  <Label htmlFor="time" className="text-sm font-medium text-gray-700">시간</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newReservation.time}
                    onChange={(e) => setNewReservation({...newReservation, time: e.target.value})}
                    className="mt-1 border-rose-200 focus:ring-rose-400"
                  />
                </div>
                
                <div>
                  <Label htmlFor="customerName" className="text-sm font-medium text-gray-700">고객명</Label>
                  <Input
                    id="customerName"
                    type="text"
                    placeholder="고객명을 입력하세요"
                    value={newReservation.customerName}
                    onChange={(e) => setNewReservation({...newReservation, customerName: e.target.value})}
                    className="mt-1 border-rose-200 focus:ring-rose-400"
                  />
                </div>
                
                <div>
                  <Label htmlFor="manager" className="text-sm font-medium text-gray-700">담당자</Label>
                  <Input
                    id="manager"
                    type="text"
                    placeholder="담당자명을 입력하세요"
                    value={newReservation.manager}
                    onChange={(e) => setNewReservation({...newReservation, manager: e.target.value})}
                    className="mt-1 border-rose-200 focus:ring-rose-400"
                  />
                </div>
                
                <div>
                  <Label htmlFor="route" className="text-sm font-medium text-gray-700">경로</Label>
                  <Input
                    id="route"
                    type="text"
                    placeholder="경로를 입력하세요"
                    value={newReservation.route}
                    onChange={(e) => setNewReservation({...newReservation, route: e.target.value})}
                    className="mt-1 border-rose-200 focus:ring-rose-400"
                  />
                </div>
                
                <div>
                  <Label htmlFor="memo" className="text-sm font-medium text-gray-700">메모</Label>
                  <Textarea
                    id="memo"
                    placeholder="메모를 입력하세요"
                    value={newReservation.memo}
                    onChange={(e) => setNewReservation({...newReservation, memo: e.target.value})}
                    className="mt-1 border-rose-200 focus:ring-rose-400 resize-none"
                    rows={3}
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 border-rose-200 hover:bg-rose-50"
                >
                  취소
                </Button>
                <Button 
                  onClick={handleSaveReservation}
                  disabled={isSaving}
                  className="flex-1 bg-rose-400 hover:bg-rose-500 text-white disabled:opacity-50"
                >
                  {isSaving ? "저장 중..." : "저장"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-rose-50/30">
      <div className="max-w-2xl mx-auto px-4 py-8 md:py-12">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
            보험상담소
          </h1>
          <p className="text-rose-400 text-sm font-medium">
            {"Let's go with LEGO"}
          </p>
        </div>

        {/* 메뉴 그리드 - 2열 배치 */}
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {menuItems.map((item) => {
            const hasDescription = item.description && item.description.length > 0
            
            return (
              <div
                key={item.title}
                onClick={() => handleMenuClick(item)}
                className={cn(
                  "bg-white rounded-2xl p-4 shadow-sm border border-rose-100 transition-all h-[88px] md:h-[96px] flex items-center cursor-pointer hover:shadow-md hover:border-rose-200 active:scale-[0.98]"
                )}
              >
                <div className="flex gap-3 items-center w-full">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-5 w-5 text-rose-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <h3 className="font-semibold text-gray-800 text-sm md:text-base leading-tight text-center md:text-left">
                        {item.title === "보험사 연락처" ? (
                          <>
                            <span className="hidden md:inline">보험사 연락처</span>
                            <span className="md:hidden leading-[1.3]">보험사<br />연락처</span>
                          </>
                        ) : item.title === "원수사 연락망" ? (
                          <>
                            <span className="hidden md:inline">원수사 연락망</span>
                            <span className="md:hidden leading-[1.3]">원수사<br />연락망</span>
                          </>
                        ) : (
                          item.title
                        )}
                      </h3>
                      {item.isExternal && (
                        <ExternalLink className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                      )}
                    </div>
                    {hasDescription && (
                      <p className="text-xs md:text-sm text-gray-400 mt-0.5 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )
          })}

          {/* PC 버전 바로가기 - 공지사항 옆 배치 */}
          <div className="rounded-2xl p-4 flex flex-col items-start justify-center">
            <p className="text-xs text-gray-400 mb-2">PC 버전 바로가기</p>
            <a
              href="https://docs.google.com/spreadsheets/d/1gCNehUY2lE2x69hCB2iWqBR0V4ER7ww93lEHPfbzomI/edit?gid=1879501890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-rose-100 text-xs text-gray-600 hover:border-rose-200 hover:bg-rose-50 transition-colors whitespace-nowrap"
            >
              <FileText className="h-3.5 w-3.5 text-rose-400 shrink-0" />
              본부통합시트
              <ExternalLink className="h-3 w-3 text-gray-400 shrink-0" />
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
