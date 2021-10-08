-- 1
-- Mostrar los 5 primeros bancos en orden ascendente que hayan tenido el mejor puntaje en el 
-- Ranking Bancario para el mes de octubre de 2020.

select b.bank_name as "Institución financiera", sum(a.active_count) as Total
from bank b, active a,
(
    select b.bank_id, sum(a.active_count) as Total
    from bank b, active a
    where a.active_month = 10 and b.bank_id = a.bank_id
    group by b.bank_id
    order by Total desc
    limit 5  
) as sub
where a.active_month = 10 and b.bank_id = a.bank_id and b.bank_id = sub.bank_id
group by b.bank_name
order by Total asc;

-- 2
-- Mostrar los últimos 5 bancos en orden descendente que hayan tenido el peor punteo en el 
-- Ranking Bancario para el mes de febrero de 2021.

select b.bank_name as "Institución financiera", sum(a.active_count) as Total
from bank b, active a,
(
    select b.bank_id, sum(a.active_count) as Total
    from bank b, active a
    where a.active_month = 2 and b.bank_id = a.bank_id
    group by b.bank_id
    order by Total asc
    limit 5
)   sub
where a.active_month = 2 and b.bank_id = a.bank_id and b.bank_id in (sub.bank_id)
group by b.bank_name
order by Total desc;

-- 3
-- Mostrar los primeros 3 bancos en orden ascendente que hayan obtenido el mejor punteo en el
-- Ranking Bancario en el primer semestre quiere; decir del 31/07/2020 al 31/01/2021

select b.bank_name as "Institución financiera", sum(a.active_count) as Total
from bank b, active a,
(
    select bsub.bank_id, sum(asub.active_count) as Total
    from bank bsub, active asub
    where asub.active_month in (7,8,9,10,11,12) and bsub.bank_id = asub.bank_id
    group by bsub.bank_id
    order by Total desc
    limit 3
) AS sub
where a.active_month in (7,8,9,10,11,12) and b.bank_id = a.bank_id and b.bank_id in (sub.bank_id)
group by b.bank_name
order by Total asc
;

-- 4
-- Mostrar al mejor banco quiere decir al banco que tenga la posición 1 en el 
-- Ranking Bancario durante el año completo; quiere decir del 31/07/2020 al 31/07/2021. 


select b.bank_name, count(*) as "No. de veces siendo primer lugar"
from bank b, active a,
(
    select act.active_month, sub1.bank_id 
    from active act,
    (
        select b.bank_id, a.active_count as Total
        from bank b, active a
        where b.bank_id = a.bank_id and a.active_month = 1
        order by Total desc
        limit 1
    ) as sub1,
    (
        select b.bank_id, a.active_count as Total
        from bank b, active a
        where b.bank_id = a.bank_id and a.active_month = 2
        order by Total desc
        limit 1
    ) as sub2,
    (
        select b.bank_id, a.active_count as Total
        from bank b, active a
        where b.bank_id = a.bank_id and a.active_month = 3
        order by Total desc
        limit 1
    ) as sub3,
    (
        select b.bank_id, a.active_count as Total
        from bank b, active a
        where b.bank_id = a.bank_id and a.active_month = 4
        order by Total desc
        limit 1
    ) as sub4,
    (
        select b.bank_id, a.active_count as Total
        from bank b, active a
        where b.bank_id = a.bank_id and a.active_month = 5
        order by Total desc
        limit 1
    ) as sub5,
    (
        select b.bank_id, a.active_count as Total
        from bank b, active a
        where b.bank_id = a.bank_id and a.active_month = 6
        order by Total desc
        limit 1
    ) as sub6,
    (
        select b.bank_id, a.active_count as Total
        from bank b, active a
        where b.bank_id = a.bank_id and a.active_month = 7
        order by Total desc
        limit 1
    ) as sub7,
    (
        select b.bank_id, a.active_count as Total
        from bank b, active a
        where b.bank_id = a.bank_id and a.active_month = 8
        order by Total desc
        limit 1
    ) as sub8,
    (
        select b.bank_id, a.active_count as Total
        from bank b, active a
        where b.bank_id = a.bank_id and a.active_month = 9
        order by Total desc
        limit 1
    ) as sub9,
    (
        select b.bank_id, a.active_count as Total
        from bank b, active a
        where b.bank_id = a.bank_id and a.active_month = 10
        order by Total desc
        limit 1
    ) as sub10,
    (
        select b.bank_id, a.active_count as Total
        from bank b, active a
        where b.bank_id = a.bank_id and a.active_month = 11
        order by Total desc
        limit 1
    ) as sub11,
    (
        select b.bank_id, a.active_count as Total
        from bank b, active a
        where b.bank_id = a.bank_id and a.active_month = 12
        order by Total desc
        limit 1
    ) as sub12
    where 
    (sub1.bank_id = act.bank_id and act.active_count = sub1.Total) or
    (sub2.bank_id = act.bank_id and act.active_count = sub2.Total) or
    (sub3.bank_id = act.bank_id and act.active_count = sub3.Total) or
    (sub4.bank_id = act.bank_id and act.active_count = sub4.Total) or
    (sub5.bank_id = act.bank_id and act.active_count = sub5.Total) or
    (sub6.bank_id = act.bank_id and act.active_count = sub6.Total) or
    (sub7.bank_id = act.bank_id and act.active_count = sub7.Total) or
    (sub8.bank_id = act.bank_id and act.active_count = sub8.Total) or
    (sub9.bank_id = act.bank_id and act.active_count = sub9.Total) or
    (sub10.bank_id = act.bank_id and act.active_count = sub10.Total) or
    (sub11.bank_id = act.bank_id and act.active_count = sub11.Total) or
    (sub12.bank_id = act.bank_id and act.active_count = sub12.Total) 
    order by act.active_month
) as subbig
where b.bank_id = a.bank_id and  subbig.bank_id = b.bank_id and a.active_month = subbig.active_month
group by b.bank_name
;