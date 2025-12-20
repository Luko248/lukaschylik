export interface SectionProps {
  id: string
  className?: string
  centerContent?: boolean
  fullHeight?: boolean
}

export interface SectionTitleProps {
  text: string
  className?: string
  dark?: boolean
  size?: 'sm' | 'md'
  center?: boolean
}
