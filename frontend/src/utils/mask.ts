export function MaskMoney(e: React.FormEvent<HTMLInputElement>) {
    let value = e.currentTarget.value
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{1,2})$/, ",$1");
    value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    e.currentTarget.value = value
    return e
}

export function MaskMoneyConvert (aluguel: string) {
    let valor = aluguel
    valor = aluguel.replace(",", "")
    valor = valor.replace(/\D/g, "");
    valor = valor.replace(/(\d{1,2})$/, ",$1");
    valor = valor.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    aluguel = valor
    return aluguel
}

export function MaskCpf(e: React.FormEvent<HTMLInputElement>) {
    e.currentTarget.maxLength = 14;
    let value = e.currentTarget.value
    value = value.replace(/\D/g, "")
    value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
    e.currentTarget.value = value
    return e
}