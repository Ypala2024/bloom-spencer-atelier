#!/usr/bin/env python3
"""Deterministic money maths for the Bloom & Spencer Advisory Board.

The cfo agent runs this instead of doing arithmetic in prose, so the same
inputs always give the same answer.

Examples
  python3 scripts/margin_calc.py margin --cost 120000 --price 185000
  python3 scripts/margin_calc.py price --stone 60000 --metal 35000 --making 15000 --overhead 10000 --target-margin 35
  python3 scripts/margin_calc.py breakeven --investment 300000 --order-value 150000 --margin 35
"""
import argparse
import math


def inr(x: float) -> str:
    """Format a number the Indian way: 12,34,567."""
    neg = x < 0
    s = f"{abs(round(x)):d}"
    if len(s) > 3:
        head, tail = s[:-3], s[-3:]
        parts = []
        while len(head) > 2:
            parts.insert(0, head[-2:])
            head = head[:-2]
        if head:
            parts.insert(0, head)
        s = ",".join(parts) + "," + tail
    return ("-" if neg else "") + "₹" + s


def cmd_margin(a):
    if a.price <= 0:
        raise SystemExit("price must be > 0")
    profit = a.price - a.cost
    print(f"Cost:          {inr(a.cost)}")
    print(f"Price:         {inr(a.price)}")
    print(f"Gross profit:  {inr(profit)}")
    print(f"Gross margin:  {profit / a.price * 100:.1f}%")
    print(f"Markup:        {profit / a.cost * 100:.1f}% on cost" if a.cost else "Markup: n/a")


def cmd_price(a):
    if not 0 <= a.target_margin < 100:
        raise SystemExit("target-margin must be between 0 and 99.9")
    cost = a.stone + a.metal + a.making + a.overhead
    price = cost / (1 - a.target_margin / 100)
    print(f"Stone:          {inr(a.stone)}")
    print(f"Metal:          {inr(a.metal)}")
    print(f"Making:         {inr(a.making)}")
    print(f"Overhead share: {inr(a.overhead)}")
    print(f"Total cost:     {inr(cost)}")
    print(f"Target margin:  {a.target_margin:.1f}%")
    print(f"Price (pre-tax, before rounding): {inr(price)}")
    print("Tax: add the current applicable GST [verify rate] on top.")


def cmd_breakeven(a):
    if a.order_value <= 0 or a.margin <= 0:
        raise SystemExit("order-value and margin must be > 0")
    profit_per_order = a.order_value * a.margin / 100
    orders = math.ceil(a.investment / profit_per_order)
    print(f"Investment:             {inr(a.investment)}")
    print(f"Average order value:    {inr(a.order_value)}")
    print(f"Gross margin:           {a.margin:.1f}%")
    print(f"Gross profit per order: {inr(profit_per_order)}")
    print(f"Extra orders to break even: {orders}")
    if a.months:
        print(f"Needed per month over {a.months} months: {orders / a.months:.1f}")


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = p.add_subparsers(dest="cmd", required=True)

    m = sub.add_parser("margin", help="margin from cost and price")
    m.add_argument("--cost", type=float, required=True)
    m.add_argument("--price", type=float, required=True)
    m.set_defaults(func=cmd_margin)

    pr = sub.add_parser("price", help="price from cost parts and a target margin")
    for f in ("stone", "metal", "making", "overhead"):
        pr.add_argument(f"--{f}", type=float, default=0)
    pr.add_argument("--target-margin", type=float, required=True, help="percent, e.g. 35")
    pr.set_defaults(func=cmd_price)

    b = sub.add_parser("breakeven", help="extra orders needed to pay back an investment")
    b.add_argument("--investment", type=float, required=True)
    b.add_argument("--order-value", type=float, required=True)
    b.add_argument("--margin", type=float, required=True, help="gross margin percent")
    b.add_argument("--months", type=int, default=0)
    b.set_defaults(func=cmd_breakeven)

    a = p.parse_args()
    a.func(a)


if __name__ == "__main__":
    main()
