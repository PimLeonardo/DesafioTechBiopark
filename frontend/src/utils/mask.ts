export function MaskMoney(e: React.FormEvent<HTMLInputElement>) {
    let value = e.currentTarget.value
    value = value.replace(/\D/g, "")
    value = value.replace(/(\d{2})(\d{1})$/, "$1,$2")
    value = value.replace(/(?=(\d{3})+(\D))\B/g, ".")
    e.currentTarget.value = value
    return e
}

export function MaskCpf(e: React.FormEvent<HTMLInputElement>) {
    e.currentTarget.maxLength = 14;
    let value = e.currentTarget.value
    value = value.replace(/\D/g, "")
    value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
    e.currentTarget.value = value
    console.log(value)
    return e
}