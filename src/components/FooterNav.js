'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { GraduationCapIcon, SettingsIcon, UserIcon } from '@/icons'
import { ROUTES } from '@/constants'

export const FooterNav = () => {
    const route = usePathname()

    return (
        <div className="btm-nav lg:btm-nav-lg">
            <Link href={ROUTES.HOME} className={`${route === ROUTES.HOME ? 'text-primary active' : ''}`}>
                <GraduationCapIcon className="h-8 w-8" />
                <span className="hidden lg:block btm-nav-label">Тренировка</span>
            </Link>
            <Link href={ROUTES.SETTINGS} className={`${route === ROUTES.SETTINGS ? 'text-primary active' : ''}`}>
                <SettingsIcon className="h-8 w-8" />
                <span className="hidden lg:block btm-nav-label">Настройки</span>
            </Link>
            <Link href={ROUTES.PROFILE} className={`${route === ROUTES.PROFILE ? 'text-primary active' : ''}`}>
                <UserIcon className="h-8 w-8" />
                <span className="hidden lg:block btm-nav-label">Профиль</span>
            </Link>
        </div>
    )
}
