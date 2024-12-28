type CardFooterCounterProps = {
  total: number
  description: string
}

export function CardFooterCounter({
  total,
  description,
}: CardFooterCounterProps) {
  return (
    <div className="text-xs text-muted-foreground">
      Exibindo{' '}
      <strong>
        {total === 0 ? 0 : 1}-{total}
      </strong>{' '}
      de <strong>{total}</strong> {description}
    </div>
  )
}
